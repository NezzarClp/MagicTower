from scipy import misc
import glob
import os
from PIL import Image

# Please refer https://chenjiehua.me/python/pil-patch-gif-disposal.html for usage

for image_path in glob.glob("./data/*.png"):
    image = misc.imread(image_path)
    
    for i in range(0, 4):
        image2 = image[64:96, i*32:(i+1)*32, :]
        strr =  "./temp" + str(i) + ".png"
        misc.imsave(strr, image2)
    
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
    img.save("./output.gif", duration=125, save_all=True, append_images=images[1:], loop=0, transparency=0, disposal=2)