---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.13.1
  kernelspec:
    display_name: tfodj
    language: python
    name: tfodj
---

# Read Me

This notebook allows one to collect images using python opencv using your computer's webcam.


# 1. Import Dependencies

```python
!pip install opencv-python
```

```python
# Import opencv
import cv2 

# Import uuid
import uuid

# Import Operating System
import os

# Import time
import time
```

# 2. Define Labels for the images we are collecting

```python
labels = ['A', 'B', 'C', 'D','E','F','G','H','I','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y']
number_imgs = 5
print(labels)
len(labels)
```

# 3. Setup Folders to store the images collected

```python
IMAGES_PATH = os.path.join('Tensorflow', 'workspace', 'images', 'collectedimages')
```

```python
if not os.path.exists(IMAGES_PATH):
    if os.name == 'posix':
        !mkdir -p {IMAGES_PATH}
    if os.name == 'nt':
         !mkdir {IMAGES_PATH}
for label in labels:
    path = os.path.join(IMAGES_PATH, label)
    if not os.path.exists(path):
        !mkdir {path}
```

# 4. Capture Images using webcam

Press spacebar to capture an image using webcam

Press ESC or q to quit the opencv window.

```python
# Capture Images 1 by 1
import cv2

#change class name to whatever that you are collecting, press space
class_name = 'Y'

directory = IMAGES_PATH + '/'+ class_name

cam = cv2.VideoCapture(0)
cv2.namedWindow("Capturing Class {}, press SPACE to capture, press ESC to exit".format(class_name))
img_counter = 100

while True:
    ret, frame = cam.read()
    if not ret:
        print("failed to grab frame")
        break
    cv2.imshow("Capturing Class {}, press SPACE to capture, press ESC to exit".format(class_name), frame)

    k = cv2.waitKey(1)
    if k%256 == 27:
        # ESC pressed
        print("Escape hit, closing...")
        break
    elif k%256 == 32:
        # SPACE BAR pressed
        img_name = directory + "/{}_{}.jpg".format(class_name,img_counter)
        cv2.imwrite(img_name, frame)
        print("{} written!".format(img_name))
        img_counter += 1
        if img_counter%10==0:
            print('\n',img_counter)
    
    
    
    if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cam.release()

#cv2.destroyAllWindows()
```

```python
# Capture Images in a for loop (not recommended as opencv may crash due to lagging code)

for label in labels:
    print('Collecting images for {}'.format(label))
    #time.sleep(5)
    
    cap = cv2.VideoCapture(0)
    
    for imgnum in range(number_imgs):
        #print('Collecting image {}'.format(imgnum))
        ret, frame = cap.read()
        imgname = os.path.join(IMAGES_PATH,label,label+'.'+'{}.jpg'.format(str(uuid.uuid1())))
        cv2.imwrite(imgname, frame)
        cv2.imshow('frame', frame)
        #time.sleep(2)

        if cv2.waitKey(10) & 0xFF == ord('q'):
            break
cap.release()
cv2.destroyAllWindows()
```
