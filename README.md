-# c-cad
CAD for creating basic furnitures, frontend for Threejs.
- c-cad is a parametric korpus generator
- c-cad creates 3d models
- input is only via text lines with special terminologie

c-cad cannot
-------------
- working with lines and arcs
- create dimensions

//Example 
------

m0 4 54 1.5 #arbeitsplatte lichtgrau buche anleimer
m1 2.8 14 1.4 kunststoff lichtgrau
m2 1.6 9 1.4 kunststoff lichtgrau
L 145
a L 100 70 m1 f1
apl L 90 m0 z84
c $a wa3
d $a wc3

MATERIAL LIST
--------------
Each row has 5 fields, separated with space:
materialNumber thickness price wasteRate # comment
-materialNumber starts with "m" followed by a number
Example:
m0 4 54 1.5 #arbeitsplatte lichtgrau buche anleimer
m1...
m2
...

Korpus List
--

Short Reference
---------------

Parts 
--

a
b back
c
c cupboard
d depth, dN
e
f=front
g ground
h height 
i
j
k
l left
m material
n n times
nx repeat in x direction
o
p
q
r right
rx 
s
t top
u
v vertical
w width,
x position x
y position y
z position z

< =   align to korpus
    /////////////////////////////////
    /*///////////////////////////////
                   5 --- 6
                 /.    / |
                1 --- 2  |
                | 4 . |. 7
                |.    | /
                0 --- 3 
    /////////////////////////////////
    /////////////////////////////////
    */
    Example: <a3 = connect current korp zero 
    to korp a corner 3

auto alignment
--------------
each new korpus has auto alignment
to previous korpus

auto variable
-------------
write the name of a previous Korpus
in Upper case letters makes a copy.
you can override parameter
