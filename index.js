const navigator = require('web-midi-api');
// consider using var navigator = require('jzz');
const {keyboard, Key} = require("@nut-tree/nut-js");

const openApps = async (messageValue) => {
  switch (messageValue[1]) {
    case 9:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.B);
      break
    case 10:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.C);
      break
    case 11:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.V);
      break
    case 12:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.T);
      break
    case 25:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.H);
      break
    case 26:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.S);
      break
    case 27:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.E);
      break
    case 28:
      await keyboard.type(Key.LeftControl, Key.LeftSuper, Key.Z);
      break
    default:
      break
  }
};

let midi;
let inputs;
let outputs;

function onMIDIFailure(msg) {
  console.log('Failed to get MIDI access - ' + msg);
  process.exit(1);
}

function onMIDISuccess(midiAccess) {
  midi = midiAccess;
  inputs = midi.inputs;
  outputs = midi.outputs;
  setTimeout(testOutputs, 500);
}

function testOutputs() {
  console.log('Testing MIDI-Out ports...');
  outputs.forEach(function(port) {
    console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
    port.open();
    port.send([0x90, 122, 0x7f]);
    port.send([0x90, 123, 0x7f]);
    port.send([0x90, 124, 0x7f]);
    port.send([0x90, 125, 0x7f]);
    port.send([0x90, 126, 0x7f]);
    port.send([0x90, 127, 0x7f]);
    port.send([0x90, 1, 0x7f]);
    port.send([0x90, 2, 0x7f]);
    port.send([0x90, 3, 0x7f]);
    port.send([0x90, 4, 0x7f]);
    port.send([0x90, 5, 0x7f]);
    port.send([0x90, 6, 0x7f]);
    port.send([0x90, 7, 0x7f]);
    port.send([0x90, 8, 0x7f]);
    port.send([0x90, 9, 0x7f]);
    port.send([0x90, 10, 0x7f]);
    port.send([0x90, 11, 0x7f]);
    port.send([0x90, 12, 0x7f]);
    port.send([0x90, 13, 0x7f]);
    port.send([0x90, 14, 0x7f]);
    port.send([0x90, 15, 0x7f]);
    port.send([0x90, 16, 0x7f]);
  });
  setTimeout(stopOutputs, 1000);
}

function stopOutputs() {
  outputs.forEach(function(port) {
    port.send([0x90, 122, 0]);
    port.send([0x90, 123, 0]);
    port.send([0x90, 124, 0]);
    port.send([0x90, 125, 0]);
    port.send([0x90, 126, 0]);
    port.send([0x90, 127, 0]);
    port.send([0x90, 1, 0]);
    port.send([0x90, 2, 0]);
    port.send([0x90, 3, 0]);
    port.send([0x90, 4, 0]);
    port.send([0x90, 5, 0]);
    port.send([0x90, 6, 0]);
    port.send([0x90, 7, 0]);
    port.send([0x90, 8, 0]);
    port.send([0x90, 9, 0]);
    port.send([0x90, 10, 0]);
    port.send([0x90, 11, 0]);
    port.send([0x90, 12, 0]);
    port.send([0x90, 13, 0]);
    port.send([0x90, 14, 0]);
    port.send([0x90, 15, 0]);
    port.send([0x90, 16, 0]);
  });
  testInputs();
}

function onMidiIn(ev) {
  // [ Log MIDI Messages ]:
  // var arr = [];
  // for(var i = 0; i < ev.data.length; i++) {
  //   arr.push((ev.data[i] < 16 ? '0' : '') + ev.data[i].toString(16));
  // }
  // console.log('MIDI:', arr.join(' '));

  openApps(ev.data)
}

function testInputs() {
  console.log('Testing MIDI-In ports...');
  inputs.forEach(function(port) {
    console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
    port.onmidimessage = onMidiIn;
  });
  // [ Kill Script ]:
  // setTimeout(stopInputs, 5000);
}

function stopInputs() {
  console.log('Thank you!');
  navigator.close(); // This will close MIDI inputs, otherwise Node.js will wait for MIDI input forever.
  process.exit(0);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);