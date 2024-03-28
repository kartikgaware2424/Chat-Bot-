const sendChatBtn=document.querySelector('.chat-input span');
const chatInput=document.querySelector('.chat-input textarea');
const chatbox=document.querySelector('.chatbox');


let userMessage;
const API_KEY = "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";

const generateResponse =function(incomingchatLi)
{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageElement=incomingchatLi.querySelector("p");
    const requestOption={
        method:"POST",
        headers:
        {"content-type":"application/json",
        "Authorization":`Bearer ${API_KEY}`
       },
       body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
    })

};
fetch(API_URL,requestOption).then(res=>res.json()).then(data=>{
    messageElement.textContent=data.choices[0].message.content;
}).catch(error=>
    {
        messageElement.textContent="Oops! Something went wrong.Please try again.";
    })
}
const CreateChatLi=function(message,className)



{
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span> <p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;

}
sendChatBtn.addEventListener("click",function(handleChat)
{
    userMessage=chatInput.value.trim();
    console.log(userMessage);
    chatbox.appendChild(CreateChatLi(userMessage,"outgoing"));
    setTimeout(function()
    { 
        const incomingchatLi=CreateChatLi("Thinking kartik......?","incoming");
        chatbox.appendChild(incomingchatLi);
        generateResponse(incomingchatLi);
    },1000)

});