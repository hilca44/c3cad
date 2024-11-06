c3cad 
---
tiny and fast 3d Korpus Generator
(carpenters-3d-cad)
---
CAD for creating basic furnitures, frontend for Threejs.
- c-cad is a parametric korpus generator
- c-cad creates 3d models
- input is only via text lines with special terminologie
- create exploded views: type g5 or g22 ...
  
![stapelbauweise](https://github.com/user-attachments/assets/4222bfcc-4953-43bf-9bf2-89368eee227f)

c3cad cannot
-------------
- working with lines and arcs
- create dimensions
- boolsche operations

installation
---
- install nodejs
- install npm
- install npm serve
- $ cd c3cad
- run npx serve
- open your browser on: 
- http://localhost:3000


c3cad cannot
-------------
- working with lines and arcs
- create dimensions

example
---
- m0, m1 ... material definition for parameter, presentation.
 later for calculation and CAD CAM module (not included)
- m0 1.9 wh 54 1.5 #span weiss
- a lrgtbc  60 60 70 m1

do not
---
do not use upper case except vars
do not use spaces in the first block, which is your korpus name
in our example is a the name


values
---
- 3 absolut value
- @3 relativ value
- 3,5,7 list

parts
---
- b back rueckw
- l left
- r right
- c cupboard
- f front
- g ground
- [gtlrfbvc] take one part (char)

properties
---
-m material number
-nx3 repeat korpus in x dir.
-s thickness
-w width
-h height 

colors
---
- wh white
- bl blue
- ei eiche
move
---
-x position x
-y position y
-z position z
-e.g., x3

rotate
---
-o[xyz] oz rotate around z axis
-e.g., oz10

copy
---
n[xyz]3


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
corners:
      5 --- 6
    /.    / |
  1 --- 2  |
  | 4 . |. 7
  |.    | /
  0 --- 3 
e.g.,
a 60 40 72
b 50 40 72 a_3
explanation: connects point 0
of current korpus to point 3 of
korpus a

push/pull
---
<part>i[lrgtfb]<value>
e.g., il3



auto variable
---
write the name of a previous Korpus
in Upper case letters makes a copy.
you can override parameter
