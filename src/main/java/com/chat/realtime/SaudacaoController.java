package com.chat.realtime;


import com.chat.realtime.model.Message;
import com.chat.realtime.model.Saudacao;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class SaudacaoController {

    @MessageMapping("/hello")
    @SendTo("/topic/saudacao")
    public Saudacao saudacao(Message message) throws Exception {

        System.out.println("Recebi uma mensagem: " + message.getName() + " - " + message.getMensagem());
        Thread.sleep(1000);
        String conteudo = HtmlUtils.htmlEscape(message.getName()) + ": " + HtmlUtils.htmlEscape(message.getMensagem());
        return new Saudacao(conteudo);

    }



}
