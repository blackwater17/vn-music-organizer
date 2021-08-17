import sys
from bson.objectid import ObjectId

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



songID = sys.argv[1]


print("pythona gelen id:  " + str(songID))



myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music-db"]
mycol2 = mydb["songs"]


file_in_db = mycol2.find_one({'_id': ObjectId(songID) })



newvalues = { "$set": { "liked": not (file_in_db["liked"]) } }
mycol2.update_one(file_in_db, newvalues)
print("Song property updated: " + file_in_db["song_title"])




