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



def getArtist(path):        ## şaibeli
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
        possible_year = int(metadata.tags.date[0][:4])
        if (possible_year < 2022 and possible_year > 1900): return possible_year
    except:
        return "Unknown"

def getExtension(path):
    return path.split(".")[-1].upper()







music_collection_folders = ["F:\\Music-Library\\public\\music-collection\\tidal_github_collection\\"]




myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["music-db"]
mycol = mydb["songs"]







for main_path in music_collection_folders:

    for path, subdirs, files in os.walk(main_path):
        for name in files:
            full_path = os.path.join(path, name)
            extension = getExtension(full_path)

            if mycol.count_documents({ 'full_path': full_path }, limit = 1) != 0:
                #print("already in db bro")
                continue
            
            try:
                metadata = audio_metadata.load(full_path)
            except:
                #print("error, skipping: " + full_path) ## you have to go different route for these.
                continue
          


            bitrate = (int(metadata.streaminfo.bitrate/1024))

            try:
                tracknumber = (metadata.tags.tracknumber[0])
            except:
                tracknumber = -1

            
            extension = extension

            album = getAlbum(full_path, metadata)
            title = getTitle(full_path, metadata)
            year = getYear(full_path, metadata)
            artist = getArtist(full_path)
            game = "Unknown"
            liked = False

            mydict = {"full_path": full_path, "album_name":album, "song_title":title, "year":year, "artist":artist, "game":game, "bitrate":bitrate, "track_number":tracknumber, "type":extension, "liked": liked, "coverImagePath":False}
            
            #print(metadata)
            #print(mydict)


            

            x = mycol.insert_one(mydict)

            #print("Music added: " + full_path)


            


