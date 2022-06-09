import * as React from 'react';
/**
 * * ref1/forwardRef/containerRef1/useImperativeHandler pattern
 */
function MessagesDisplay({ messages }, ref) {
  const containerRef = React.useRef();
  React.useImperativeHandle(ref, () => ({
    scrollToTop: function scrollToTop() {
      containerRef.current.scrollTop = 0;
    },
    scrollToBottom: function scrollToBottom() {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    },
  }));
  React.useLayoutEffect(() => {
    // ref.current = {
    //   scrollToTop: function scrollToTop() {
    //     containerRef.current.scrollTop = 0
    //   },
    //   scrollToBottom: function scrollToBottom() {
    //     containerRef.current.scrollTop = containerRef.current.scrollHeight
    //   },
    // }
    ref.current.scrollToBottom();
  });

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  );
}
// eslint-disable-next-line no-func-assign
MessagesDisplay = React.forwardRef(MessagesDisplay);

function App() {
  const messageDisplayRef = React.useRef();
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8));
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null;
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null;

  const scrollToTop = () => messageDisplayRef.current.scrollToTop();
  const scrollToBottom = () => messageDisplayRef.current.scrollToBottom();

  return (
    <div className="messaging-app">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <div>
        <button onClick={scrollToTop}>scroll to top</button>
      </div>
      <MessagesDisplay ref={messageDisplayRef} messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  );
}
