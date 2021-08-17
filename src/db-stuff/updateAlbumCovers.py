import os

import re
import codecs
import os 
from os import listdir
from os.path import isfile, join
import filetype
import pymongo
import ffmpeg
import math 
import subprocess
import audio_metadata
from pathlib import Path



def findFromFiletype(full_path):
    
    currentFolder = os.path.dirname(full_path) + "\\"
    
    while(True):

        if (currentFolder.endswith("music-collection")): 
            return False  ## daha fazla dönmesin

        current_all_filenames = os.listdir(currentFolder)
        image_filenames = []
        for file in current_all_filenames:
            if (file.endswith(".jpg") or file.endswith(".jpeg") or file.endswith(".png") or file.endswith(".bmp")): image_filenames.append(file)
        
        if (len(image_filenames) == 1): 
            return currentFolder + image_filenames[0]


        else:
            
            if (len(image_filenames) == 0):
                num = len(currentFolder.split("\\")) - 1 
                currentFolder = currentFolder.split("\\")[:num]
                currentFolder = '\\'.join([str(elem) for elem in currentFolder])
            
            else: #birden fazla image varsa
                for image_file in image_filenames:
                    if ("cover" in image_file.lower() or "front" in image_file.lower() or "folder" in image_file.lower()):
                        return currentFolder + image_file
                
                return False
        
         













def findSongCover(full_path):

    currentFolder = os.path.dirname(full_path) + "\\"

    while(1):

        if (currentFolder.endswith("music-collection")): 
            #return False  ## daha fazla dönmesin
            return findFromFiletype(full_path) ## son bi şans, belki cover.jpg değil de front.jpg falan diye var?

        if (os.path.isfile(currentFolder + "cover.jpg")): return currentFolder + "cover.jpg"
        else:
            num = len(currentFolder.split("\\")) - 1 
            currentFolder = currentFolder.split("\\")[:num]
            currentFolder = '\\'.join([str(elem) for elem in currentFolder])
            # print("yeni normal: " + currentFolder)
            possible_cover_path = currentFolder + "\\" + "cover.jpg"
            if (os.path.isfile(possible_cover_path)): return possible_cover_path







music_collection_folders = ["F:\\Music-Library\\public\\music-collection\\tidal_github_collection\\"]




myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music-db"]
mycol = mydb["songs"]

mydoc = mycol.find()


for x in mydoc:

    full_path = x["full_path"]

    ''' bi artisi .txte eklemeyi unuttuysan..
    if (x["artist"] == "Unknown" and "\\Two Door Cinema Club\\" in full_path):

        newvalues = { "$set": { "artist": "Two Door Cinema Club" } }
      

        
        mycol.update_one(x, newvalues)

        print("updated artist: " + x["album_name"] + " - " + x["song_title"])


    continue
   '''
    if (x["coverImagePath"] != False): 
        continue

    else:
    
        coverImagePath = findSongCover(full_path)

        
        newvalues = { "$set": { "coverImagePath": coverImagePath } }
      

        
        mycol.update_one(x, newvalues)

        #print("updated cover: " + x["album_name"] + " - " + x["song_title"])























