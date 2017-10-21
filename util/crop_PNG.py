from scipy import misc
import glob
import sys

numRow = int(sys.argv[1])
numColumn = int(sys.argv[2])

for image_path in glob.glob("./data/*.png"):
    image = misc.imread(image_path)
    image = image[numRow*32:(numRow+1)*32,numColumn*32:(numColumn+1)*32,:];
    misc.imsave('result.png', image)
    