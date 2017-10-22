from scipy import misc
import glob
import os
import sys
from PIL import Image

# Please refer https://chenjiehua.me/python/pil-patch-gif-disposal.html for usage

numRow = int(sys.argv[1])
numColumn = int(sys.argv[2])

if sys.argv[3] == 'column':
    isColumn = 1
else:
    isColumn = 0
    
outputPath = sys.argv[4];

for image_path in glob.glob("./data/*.png"):
    image = misc.imread(image_path)
    
    for i in range(0, 4):
        image2 = image[numRow*32:(numRow+1)*32,numColumn*32:(numColumn+1)*32,:]
        strr =  "./temp" + str(i) + ".png"
        misc.imsave(strr, image2)
        
        if (isColumn == 1):
            numRow = numRow + 1
        else:
            numColumn = numColumn + 1
    
    images = [];
    strr =  "./temp" + str(0) + ".png"
    image = Image.open(strr)
    mask = Image.new("RGBA", image.size, (255, 255, 255, 0))
    for i in range(0, 4):
        strr =  "./temp" + str(i) + ".png"
        image = Image.open(strr)
        os.remove(strr);
        images.append(Image.alpha_composite(mask, image))
    
    img = images[0]
    images.append(img)
    img.save(outputPath, duration=100, save_all=True, append_images=images[1:], transparency=0, disposal=2)