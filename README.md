# AlphaSign: A Static Sign Language Alphabet Game
![framework](https://img.shields.io/badge/framework-node.js,react-red)
![hosting](https://img.shields.io/badge/hosting-githubpages-blue)
![libraries](https://img.shields.io/badge/libraries-tensorflow,tensorflow.js,opencv-green)

A tensorflow.js web application that utilies TF2 object detection models to recognize real-time static American Sign Language (ASL) via web browser. This web application comes in a form of a game that recognises ASL alphabets via the user's web cam. Try the live demo [here](https://yappeizhen.github.io/AlphaSign/).

Explore **SignPose**, the dynamic version of our sign language game [here](https://github.com/ngzhili/SignPose).

## Web Application Home Page
![image](https://user-images.githubusercontent.com/66234273/137351776-50edd012-7aef-45b2-b023-34ecd776c4ba.png)

![image-inference](https://github.com/yappeizhen/AlphaSign/blob/master/read-me-images/extended-inference-2.JPG)

# Object Detection Models
Using the concept of transfer learning, we finetuned [TensorFlow 2 Detection Model Zoo](https://github.com/tensorflow/models/blob/master/research/object_detection/g3doc/tf2_detection_zoo.md) SSD MobileNetv2 FPNLite 320x320 model weights via the TF2 Object Detection API in Google Colab. 
As the computer vision models are running on [tensorflow.js](https://www.tensorflow.org/js), inference is carried out on cilent side and no video/image data from the user is sent to the website hosting server.

## 1) Baseline Model

![image](https://github.com/yappeizhen/SignAI/blob/541e4b6ec86c82f9951894d048306ca80cc17ab1/read-me-images/video_inference_baseline.gif)

- 4 Classes: A, B, C, D.
- Finetuned on SSD MobileNetv2 FPNLite 320x320 pre-trained on COCO 2017 dataset.

## 2) Extended Model

![image](https://github.com/yappeizhen/SignAI/blob/541e4b6ec86c82f9951894d048306ca80cc17ab1/read-me-images/video_inference_extended.gif)

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
![image](https://github.com/yappeizhen/SignAI/blob/605a84147da2c8616cbb5a17eb0c548be8a5ef04/read-me-images/test-inference-image.JPG)



## Video Inference 

https://user-images.githubusercontent.com/69728128/140551491-1a4cc608-af6a-4e21-9a47-722ee12ec427.mp4



