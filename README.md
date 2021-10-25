# Static Sign Language Alphabet Game
A tensorflow.js web application that utilies TF2 object detection models to recognize ASL static sign languages. This web application comes in a form of a game that recognises and translates sign language alphabets to English. Try the live demo [here](https://yappeizhen.github.io/Sign-Language-Image-Recognition/).

## Web Application Home Page
![image](https://user-images.githubusercontent.com/66234273/137351776-50edd012-7aef-45b2-b023-34ecd776c4ba.png)


# Object Detection Model
Utilized concept of transfer learning to fine tune TF2 model weights via TF2 Object Detection API in Google Colab.

## Baseline Model
- 4 Classes: A, B, C, D.
- Finetuned on TF2 Model ZOO SSD MobileNetv2 FPNLite 320x320 pre-trained on COCO 2017 dataset.

## Extended Model
- 24 Classes: A, B, C, D, E, F, G, H, I, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y.
- J and Z are excluded as they are both dynamic sign langauges involving movement.
- Finetuned on TF2 Model ZOO SSD MobileNetv2 FPNLite 320x320 pre-trained on COCO 2017 dataset.

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
