#!/usr/bin/python
# .OBJ to JSON
# by Javi Agenjo (javi.agenjo@gmail.com) 26/6/11
# only works with OBJs with normals and uvs
import os,sys
import json,math

version = "0.4"

if len(sys.argv) < 2:
    print "Error: Filename parameter missing"
    exit(1)

filename = sys.argv[1]
meshname = ""
objectname = ''

if len(sys.argv) > 2:
    objectname = sys.argv[2]

use_3dsmax = False
if "-max" in sys.argv: use_3dsmax = True

use_indexed = True
if "-indexed" in sys.argv: use_indexed = True

indexed_vertices = []
indexed_normals = []
indexed_uvs = []

positions = []
normals = []
uvs = []
indices = []

unique_indexed = 0
indexed_triplets = {}

def add(v):
    global positions,normals,uvs,indexed_vertices,indexed_normals,indexed_uvs
    t = v.split("/")
    #print "*"+v+"*"
    positions.append( indexed_vertices[ int(t[0])-1 ] )
    uvs.append( indexed_uvs[ int(t[1])-1 ] )
    normals.append( indexed_normals[ int(t[2])-1 ] )
    return len(positions) - 1

def addIndexed(v):
    global indexed_triplets, indices
    i = indexed_triplets.get(v)
    if i == None:
        i = add(v)
	indexed_triplets[v] = i
    indices.append(i)

def array2string(a):
    r = "["
    for v in a:
        for n in v:
            r += str(n) + ","
    return r[:-1] + "]"

def linealize(a):
    r = []
    for v in a:
        for n in v:
            r.append(n)
    return r

def computeMinMax(a):
    min_v = [1000000,1000000,1000000]
    max_v = [-1000000,-1000000,-1000000]
    for v in a:
        min_v[0] = min( min_v[0], v[0] )
        min_v[1] = min( min_v[1], v[1] )
        min_v[2] = min( min_v[2], v[2] )
        max_v[0] = max( max_v[0], v[0] )
        max_v[1] = max( max_v[1], v[1] )
        max_v[2] = max( max_v[2], v[2] )
    return (min_v,max_v)

try:
    fin = open(filename)
except IOError:
    print "Error: file cannot be opened"
    exit(1)

try:
    #if True:
    for line in fin.readlines():
	#print line
        line = line.replace("\r\n","")
        line = line.replace("  "," ")
	line = line.strip()
        words = line.split(' ')
        #print ":::" + words[0]
        if words[0] == '#':
            continue

        if words[0] == 'v':
            if use_3dsmax:
                indexed_vertices.append( [ -1 * float(words[1]), float(words[3]), float(words[2]) ])
            else:
                indexed_vertices.append( [ float(words[1]), float(words[2]) ,float(words[3]) ])
        elif words[0] == 'vn':
            if use_3dsmax:
	        indexed_normals.append( [ -1 * float(words[1]), float(words[3]) , float(words[2]) ])
	    else:
	        indexed_normals.append( [ float(words[1]), float(words[2]) , float(words[3]) ])
        elif words[0] == 'vt':
            indexed_uvs.append( [ float(words[1]), float(words[2]) ])
        elif words[0] == 'f':
            size = len(words)
            #0 is f, #1 first vertex, start in 2, ends when there is one remaining
            for i in range(2,size-1):
                #print "T:"+line+"=>["+str(i)+"]"+words[i]+" len: "+str(len(words))
		if use_indexed:
                    addIndexed(words[1])
                    addIndexed(words[i])
                    addIndexed(words[i+1])
		else:
                    add(words[1])
                    add(words[i])
                    add(words[i+1])
        elif words[0] == 'g' and len(words) > 1:
	    #print words
            meshname = words[1]
except:
    print "Error, problem parsing OBJ"
    exit(1)

fin.close()

if len(positions) == 0:
    print "Error, no OBJ info found"
    exit(1)

minmax = computeMinMax(indexed_vertices)

obj = {}
obj["version"] = version
obj["filename"] = filename
obj["meshname"] = meshname
obj["positions"] = linealize(positions)
obj["normals"] = linealize(normals)
if len(indices):
    obj["indices"] = indices
obj["uvs"] = linealize(uvs)
obj["aabb_min"] = minmax[0]
obj["aabb_max"] = minmax[1]
obj["numvertices"] = len(positions)

from json import encoder
encoder.FLOAT_REPR = lambda o: format(o, '.3f')

if objectname != '':
    print objectname + " = ",
print json.dumps(obj)
exit(0)
