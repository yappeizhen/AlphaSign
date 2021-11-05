# Static Sign Language Alphabet Game
A tensorflow.js web application that utilies TF2 object detection models to recognize real-time ASL static sign languages via web browser. This web application comes in a form of a game that recognises sign language alphabets via the user's web cam. Try the live demo [here](https://yappeizhen.github.io/SignAI/).

Explore the dynamic version of our sign language game [here](https://github.com/ngzhili/LSTM_Keypoint_Sign_Language_Detector).

## Web Application Home Page
![image](https://user-images.githubusercontent.com/66234273/137351776-50edd012-7aef-45b2-b023-34ecd776c4ba.png)


# Object Detection Models
Using the concept of transfer learning, we finetuned [TensorFlow 2 Detection Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) SSD MobileNetv2 FPNLite 320x320 model weights via the TF2 Object Detection API in Google Colab. 
As the computer vision models are running on [tensorflow.js](https://www.tensorflow.org/js), inference is carried out on cilent side and no video/image data from the user is sent to the website hosting server.

## 1) Baseline Model
- 4 Classes: A, B, C, D.
- Finetuned on SSD MobileNetv2 FPNLite 320x320 pre-trained on COCO 2017 dataset.

## 2) Extended Model
- 24 Classes: A, B, C, D, E, F, G, H, I, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y.
- J and Z are excluded as they are both dynamic sign langauges involving movement.
- Finetuned on SSD MobileNetv2 FPNLite 320x320 pre-trained on COCO 2017 dataset.

### Exploratory Data Analysis
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/4528b2082f3e533376f2a0e5dfa5cb31cf1c743d/read-me-images/extended-model-train-distribution.png)          ![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/4528b2082f3e533376f2a0e5dfa5cb31cf1c743d/read-me-images/extended-model-test-distribution.png)

### Evaluation Results @11,000 steps

- Test mean average precision (mAP) and average recall
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/1c8efa58b98b1202f3b1d548b8229fd8cd59d6a5/read-me-images/extended-model-test-map.png)

-  Test Confusion Matrix @0.5IOU
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/3a9cdeb235bbbce4ce2113f9cf7d8212ab4defd5/read-me-images/extended-model-test-confusion-matrix.png)

- Test Precision Recall Plot @0.5IOU
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/3a9cdeb235bbbce4ce2113f9cf7d8212ab4defd5/read-me-images/extended-model-test-precision-recall.png)

- Test Precision Plot @0.5IOU
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/3a9cdeb235bbbce4ce2113f9cf7d8212ab4defd5/read-me-images/extended-model-test-precision.png)

- Test Recall Plot @0.5IOU
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/3a9cdeb235bbbce4ce2113f9cf7d8212ab4defd5/read-me-images/extended-model-test-recall.png)

- Inference on Test Image (Groundtruth bounding box in blue with IOU Score of prediction result)
![image](https://github.com/yappeizhen/Sign-Language-Image-Recognition/blob/ec61cb5aa6485d9f93bc5b79aa57139957def862/read-me-images/inference-iou-h.png)
