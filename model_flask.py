from flask import Flask, request, redirect, url_for
import numpy as np
from keras.models import load_model
from keras.preprocessing import image

app = Flask(__name__)

# Load the model
model = load_model('ModernVTraditional.h5')

@app.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Save the file
        f = request.files['file']
        upload_dir = 'uploads'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        filepath = os.path.join(upload_dir, f.filename)
        f.save(filepath)

        # Load and preprocess the image
        img = image.load_img(filepath, target_size=(150, 150)) 
        x = image.img_to_array(img) / 255.0  # assuming you normalized images during training
        x = np.expand_dims(x, axis=0)

        # Classify the image
        classes = model.predict(x)
        result = "new" if classes[0][0] > 0.5 else "old" 

        return jsonify(result=result)

    return '''
    <!doctype html>
    <title>Upload an image</title>
    <h1>Upload an image</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

if __name__ == '__main__':
    app.run(debug=True)

