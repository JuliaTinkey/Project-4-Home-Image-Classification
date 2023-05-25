import cv2
import numpy as np

def convert_images_to_tensor(images, target_size=(50, 50)):
    numpy_images = [np.array(img) for img in images]
    
    resized_images = []
    for img in numpy_images:
        resized_img = cv2.resize(img, target_size)
        if resized_img.shape == (target_size[0], target_size[1], 3):
            resized_images.append(resized_img)
    
    resized_images_norm = [img / 255.0 for img in resized_images]
    tensor = np.stack(resized_images_norm, axis=0)
    
    return tensor
