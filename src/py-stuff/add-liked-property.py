
import re
import codecs
import os 
from os import listdir
from os.path import isfile, join
import filetype
import pymongo
import ffmpeg
import math 
from PIL import Image
import subprocess



myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music-db"]
mycol = mydb["songs"]


mydoc = mycol.find()

i = 0

for x in mydoc:

    

    if (i < 5):
        newvalues = { "$set": { "liked": True } }
    else:
        newvalues = { "$set": { "liked": False } }
    
    mycol.update_one(x, newvalues)

    print("updated: " + x["song_title"])

    i+=1
   

exit()
