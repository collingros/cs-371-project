Aggressively Passive


arduino/

	arduino IDE code for using a motion sensor,
	thermo sensor, and our rf-transmitter.

	using two arduinos, connect a breadboard
	and rf-transmitter to each. attach a sensor to one.
	run the code in this directory inside of the android
	IDE. you will be able to receive sensor readings over
	rf signals from the alien arduino wirelessly.

system/

	experimental code for running a server on the pi
	and sending/receiving info on the app. our project
	was incomplete at the time of the final deadline,
	so the code is currently usuable. our idea was to use
	this code to transmit data receieved from the
	raspberry pi (which would have replaced the alien
	arduino) to an app on android.

	we ran out of time, but were finding some early success
	in using a single pi instead of an arduino and a pi.
	using the code in system/, one could finish devloping the
	client-side part of things (android app), and start receiving
	sensor data.
