let synth=speechSynthesis,
    iSpeaking=true
const textarea=document.querySelector("textarea"),
      speechBtn=document.querySelector("button"),
      voiceList=document.querySelector("select");

voices();
function voices(){
  for(let voice of synth.getVoices()){
    let selected=voice.name==="Google US English" ? "selected":"";
    let option=`<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`
    voiceList.insertAdjacentHTML("beforeend",option);
  }
}

function textToSpeech(txt){
  let utterance=new SpeechSynthesisUtterance(txt);
  for(let voice of synth.getVoices()){
    if(voice.name===voiceList.value){
      utterance.voice=voice;
    }
  }
  synth.speak(utterance);
}

synth.addEventListener("voiceschanged", voices);

speechBtn.addEventListener("click", e=>{
  e.preventDefault();
  if(textarea.value !== ""){
    if(!synth.speaking){
    textToSpeech(textarea.value);
  }
  if(textarea.value.length> 50){
    if(iSpeaking){
      synth.resume();
      iSpeaking=false;
      speechBtn.innerText="Pause Speech";
    }
    else{
      synth.pause();
        iSpeaking=true;
      speechBtn.innerText="Resume Speech";
      }

      setInterval(()=>{
        if(!synth.speaking && !iSpeaking){
        iSpeaking=true;
        speechBtn.innerText="Convert To Speech";
        }
      });
    }
    else{
      speechBtn.innerText="Convert To Speech";
    }
  }
});