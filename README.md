<pre>
c3cad 
---
3D Furniture Body Generator
(carpenters-3d-cad)
---
tiny and fast
CAD for creating basic furnitures, frontend for Threejs.
- c3cad is a parametric furniture body generator
- c3cad creates 3d models
- describe your object with short text blocks
- creates exploded views: type xx5 xy22 xz5 ...
</pre>
![c3cad_s4](https://github.com/user-attachments/assets/d39c79fe-bdb2-43f2-910c-f34182f26697)
<pre>
  

- live demo:
- https://hilbertcnc.de/c3cad/
  
example
---
bed in 3 minutes
</pre>
![c3cad_bed_s3](https://github.com/user-attachments/assets/6530be92-2860-406e-bb28-b84e66130990)
<pre>
c3cad cannot
-------------
- working with lines and arcs
- create dimensions
- boolsche operations

installation
---
This app needs a webserver
a) load the app folder to your server
b) install a web server locally
- install nodejs
- install npm
- install npm serve
- $ cd c3cad
- run npx serve
- open your browser on: 
- http://localhost:3000

example
---
- m0, m1 ... material definition for parameter, presentation.
 later for calculation and CAD CAM module (not included)
- m0 1.9 wh 54 1.5 #span weiss
- a lrgtbc  60 60 70 m1

do not
---
do not use upper case except vars
do not use spaces in the first block, which is your furniture body name
in our example is "a" the name

values
---
3     absolute value
@3    relativ value
3,5,7 list

parts
---
b back rueckw
l left
r right
c cupboard (inside horizontal)
v vertical (inside)
f front
g ground
[gtlrfbvc] take one part (char)

properties
---
m   material number
nx3 repeat furniture body in x dir.
s   thickness
w   width
h   height 

rules
---
- each row is one furniture body
- \# this is a comment or disable a row

- first 5 blocks must be :
- name parts wdth depth heigth
- test lrgc 30 30 60 (centimeter)

colorsh
---
wh  white
bl  blue
ei  eiche
  
move
---
x  position x
y  position y
z  position z
example: x3

rotate furniture body
---
ox  rotate around x axis
oz  rotate around z axis
example: oz10

copy
---
n[xyz]3

divide
---
- divide parts in equal pieces
- example: fdx2
- <part>d<direction><number>

divide with gap
---
divide parts into several pieces with gap
  between parts
example: fdx2,1
explanation: divide front in 2 parts with gap 1 cm
- <part>d<direction><number>,<gap>


variable
---
use upper case letters
e.g.
A 60
B x7

connect
---
a_3
<name>_<corner>
a.g_2
<name>.<part>_<corner>
corners: </br>
      5 --- 6
    /.    / |
  1 --- 2  |
  | 4 . |. 7
  |.    | /
  0 --- 3 
example:
a lrgtb 60 40 72
b lrgtb 50 40 72 a_3
explanation: connects point 0
of current furniture body to point 3 of
furniture body a

push/pull
---
<part>i[lrgtfb]<value>
example: il3



auto variable
---
write the name of a previous furniture body
in Upper case letters makes a copy.
you can override parameter
</pre>
