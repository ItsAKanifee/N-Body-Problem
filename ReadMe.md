The following is a mathematical model of how three planets in a gravtitational system would move in regards to their respective masses and gravitational pull on each other.

The following code is a benchmark of my current capabilities of Javascript, as well as my understanding of math. While designed to be accurate, it may have some issues in terms of the code or accuracy of the simulation (i.e if two bodies crash in to each other, they fling off into space).




Overview:

The code is a website that runs a simulation of three different planets in a set area of space. This space covers about 1400m in width, and about 770m in width. I know, cosmologically speaking, this will be an unrealistically small area, but in terms of the numbers, it works. I also did not want to use values in which it would take several years (in actual time) to see the simulation actually do something interesting; as such all the numbers are made to have the simulation run in seconds.


Moving on, each planet has several entries. The top entry is the mass of the object in 10^11 kg. Because gravity is a fairly weak force, the mass needs to be scaled up quite a bit to see something interesting happen. This is the smallest scale to work with the G constant. However, if you want to make things much heavier or lighter, just add a few more zeroes. If you do not feel like updating the mass, however, the simulation will default to 10*10^11kg.

Beyond that, each planet has x and y position, as well as x and y velocity. Again, both of these numbers are described in m/s. If you do not want to update these, then the simulation will default to 0 for each of the values.

Finally, if you change the boxes, be sure to press the update button, otherwise the simulation will not have your new values calculated. Once you do that, press run. The simulation will then show what will happen within the system. You can press reset if you get bored, or you want to try something different. Note: if all three planets leave the screen, the simulation will reset itself.