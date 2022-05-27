# from colorsys import rgb_to_hls
# from xmlrpc.client import ProtocolError
from flask import Flask, render_template, Response
import cv2
import face_recognition
import numpy as np
import cv2, queue, threading, time
import requests, os, re

urlserver = "https://attendy-student.herokuapp.com"

rr=[]
while (rr==[] or rr.json()==[] ):
    Emailid = input("\nEnter Your Email ID..!\n")
    rr = requests.get(url=f"{urlserver}/fetchaccount/{Emailid}")
    if rr.json()==[]:
        print("\nYour Account Does Not Exist Please Create A Account First or Retry")

USER_ID = rr.json()[0].get("_id")
print(f"\nYOUR USER ID: {USER_ID}\n")

FILE_PATH = os.path.dirname(os.path.realpath(__file__))

app = Flask(__name__)
camera = cv2.VideoCapture(0)

Known_Students_encodings = []
Known_Students_filenames = []
Known_Students_names = []
Known_Students_firstnames = []
Known_Students_lastnames = []
Known_Students_classs = []
Known_Students_rolls = []
Known_Students_sections = []
nome = []

for (dirpath, dirnames, filenames) in os.walk(f"{FILE_PATH}/photo_of_students"):
    Known_Students_filenames.extend(filenames)
    break

for filename in Known_Students_filenames:
    file_name = os.path.basename(filename)
    file_name_ext = os.path.splitext(file_name)[0]
    lit = file_name_ext.split("_")
    face = face_recognition.load_image_file(f"{FILE_PATH}/photo_of_students/" + filename)
    Known_Students_firstnames.append(lit[0])
    Known_Students_lastnames.append(lit[1])
    Known_Students_classs.append(lit[2])
    Known_Students_sections.append(lit[3])
    Known_Students_rolls.append(lit[4])
    Known_Students_encodings.append(face_recognition.face_encodings(face)[0])

Student_face_locations = []
Student_face_encodings = []
Student_face_names = []
process_this_frame = True
def generate_frames():
    while True:
        success, frame = camera.read()

        if not success:
            break
        else :
            small_frame = cv2.resize(frame,(0,0),fx=0.25,fy=0.25)
            rgb_small_frame = small_frame[:,:,::-1]
            Student_face_locations = face_recognition.face_locations(rgb_small_frame)
            Student_face_encodings = face_recognition.face_encodings(rgb_small_frame, Student_face_locations)
            Student_face_names = []
            json_to_export = {}

            for face_encoding in Student_face_encodings:
              matches = face_recognition.compare_faces(Known_Students_encodings, face_encoding)
              name = "Unknown"
              face_distances = face_recognition.face_distance(Known_Students_encodings, face_encoding)
              best_match_index = np.argmin(face_distances)

              if matches[best_match_index]:
                firstname = Known_Students_firstnames[best_match_index]
                lastname = Known_Students_lastnames[best_match_index]
                classs = Known_Students_classs[best_match_index]
                section = Known_Students_sections[best_match_index]
                roll = Known_Students_rolls[best_match_index]
                name = f'{firstname} {lastname}'
                json_to_export['firstname'] = firstname
                json_to_export['lastname'] = lastname
                json_to_export['classs'] = classs
                json_to_export['section'] = section
                json_to_export['roll'] = roll
                json_to_export['time'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
                dd = time.localtime().tm_mday
                mm = time.localtime().tm_mon
                if(dd<10):
	                dd='0'+str(dd)
                if(mm<10):
	                mm='0'+str(mm)
                json_to_export['date'] = f'{dd}-{mm}-{time.localtime().tm_year}'
                r = requests.get(url=f"{urlserver}/findstudent/{USER_ID}", json=json_to_export)
                datas = r.json()
                if datas==[]:
                    ro = requests.post(url=f"{urlserver}/attendance/{USER_ID}", json=json_to_export)
                    
              Student_face_names.append(name)

            for (top, right, bottom, left), name in zip(Student_face_locations, Student_face_names):
              top *= 4
              right *= 4
              bottom *= 4
              left *= 4
              cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)
              cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
              font = cv2.FONT_HERSHEY_DUPLEX
              cv2.putText(frame, name, (left + 6, bottom - 6),font, 1.0, (255, 255, 255), 1)

            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield(b'--frame\r\n'
                  b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/')
def index():
    return render_template('main.html')

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=False ,host='127.0.0.1',port=5000)
