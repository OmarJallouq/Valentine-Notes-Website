import React from 'react';

function Message() {
    return(
        <section>
            <form method="POST" action="/sendMessage">
                    <div class="input-group justify-content-center">
                        <div class="input-group-prepend">
                            <input type="text" name="messageInput" class="form-control" />
                            <input type="text" name="recieverInput" class="form-control" />
                            <input type="submit" value="Send" class="btn btn-primary mb-2" />
                        </div>
                    </div>
                </form>
        </section>
    );
}

export default Message;