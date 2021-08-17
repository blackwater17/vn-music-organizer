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



hali_hazir_artists = codecs.open("F:\\Music-Library\\public\\music-collection\\_music_infos\\artists.txt", encoding="utf8").read().split("\n")



hal2 = map(lambda x: x.replace("\r", ""), hali_hazir_artists)
hali_hazir_artists =list(hal2)


def getArtist(path):
    for artist in hali_hazir_artists:
        if ("\\" + artist in path + "\\"): return artist

    return "Unknown"


def getAlbum(path, metadata):

    try:
        return metadata.tags.album[0]
    except: 
        return "Unknown"


def getTitle(path, metadata):
    
    try:
        return metadata.tags.title[0]
    except: 
        return "Unknown"


def getYear(path, metadata):
    
    try:
        return int(metadata.tags.date[0])
    except: 
        return "Unknown"

def getExtension(path):
    return path.split(".")[-1].upper()



myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music-db"]
mycol = mydb["albums"]








public_folder_paths = ["F:\\Music-Library\\public\\music-collection\\new_music_collection\\"]

for main_path in public_folder_paths:

    for path, subdirs, files in os.walk(main_path):
        for name in files:
            full_path = os.path.join(path, name)
            extension = getExtension(full_path)
            
            try:
                metadata = audio_metadata.load(full_path)
            except:
                print("error, skipping: " + full_path)
                continue

            #bitrate = (int(metadata.streaminfo.bitrate/1024))
            #tracknumber = (metadata.tags.tracknumber[0])
            #extension = extension
 
            album = getAlbum(full_path, metadata)
            #title = getTitle(full_path, metadata)
            year = getYear(full_path, metadata)
            artist = getArtist(full_path)
            #game = "Unknown"

            mydict = {"album_name":album, "year":year, "artist":artist}
            mydoc = mycol.find(mydict)

            if (len(list(mydoc)) > 0 ):
                print("already..")
                continue ## is already in db



            x = mycol.insert_one(mydict)

            print("Album added: " + artist + " - " + album)



    

