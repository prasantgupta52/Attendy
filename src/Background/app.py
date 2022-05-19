from colorsys import rgb_to_hls
from xmlrpc.client import ProtocolError
from flask import Flask, render_template, Response
import cv2
import face_recognition
import numpy as np
import cv2, queue, threading, time
import requests, os, re

app = Flask(__name__)
camera = cv2.VideoCapture(0)

Known_Students_encodings = []
Known_Students_names = []
Known_Students_filenames = []

for (dirpath, dirnames, filenames) in os.walk('C:/Users/PRASANT GUPTA/OneDrive/Desktop/photos/train'):
    Known_Students_filenames.extend(filenames)
    break

for filename in Known_Students_filenames:
    face = face_recognition.load_image_file('C:/Users/PRASANT GUPTA/OneDrive/Desktop/photos/train/' + filename)
    Known_Students_names.append(re.sub("[0-9]",'', filename[:-4]))
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
                name = Known_Students_names[best_match_index]
                json_to_export['name'] = name
                json_to_export['hour'] = f'{time.localtime().tm_hour}:{time.localtime().tm_min}'
                json_to_export['date'] = f'{time.localtime().tm_year}-{time.localtime().tm_mon}-{time.localtime().tm_mday}'
                json_to_export['picture_array'] = frame.tolist()

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
    return render_template('pika.html')

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == "__main__":
    app.run(debug=True ,host='127.0.0.1',port=80)
