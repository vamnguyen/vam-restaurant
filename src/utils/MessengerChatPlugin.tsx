import React, { useEffect } from "react";

const MessengerChatPlugin: React.FC = () => {
  useEffect(() => {
    let chatbox = document.getElementById("fb-customer-chat");
    chatbox?.setAttribute("page_id", "105429985993103");
    chatbox?.setAttribute("attribution", "biz_inbox");

    // Initialize Facebook SDK
    (window as any).fbAsyncInit = function () {
      (window as any).FB.init({
        xfbml: true,
        version: "v17.0",
      });
    };

    // Load Facebook SDK asynchronously
    (function (d, s, id) {
      let js: any,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.setAttribute(
        "src",
        "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js"
      );
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <>
      {/* Messenger Chat Plugin Code */}
      <div id="fb-root"></div>

      {/* Your Chat Plugin code */}
      <div id="fb-customer-chat" className="fb-customerchat"></div>
    </>
  );
};

export default MessengerChatPlugin;
