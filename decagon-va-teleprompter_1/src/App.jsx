import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import {
  Globe, Languages, Plus, Pencil, Trash2, Upload, Download, ChevronRight,
  ChevronLeft, ChevronDown, X, Check, ArrowRight, ArrowLeft, Sparkles,
  MessageSquare, FileText, ListChecks, Type, Minus, Info, BookOpen, Play,
  CircleCheck, AlertCircle, Hash, FolderPlus, Eye, Maximize2, ClipboardList,
  Home as HomeIcon, MapPin
} from "lucide-react";

const LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJMAAAAgCAYAAAAWu0rOAAAN4ElEQVR42u1bbbhU1XV+1565M2etI6AtokQoeiEaIiqESm2lAkZTg+YhqGASbRBjjcWoEbAK+EEVIkVClA+NIlaSmkRMiFYT0yRNJGKipQKBNCHKh1XAiKKInb3PvTOzV3/MOdzDMHPngoGEeNfzzHNnztn77L3Xevf6ePe5wD4KMw8VkdUi8q9AeNQ+du+KTumUIAj6MMu3RUJNPszhLubwBgD5Bt27M8s9zOE3AEBEPsAsm5l5bKdm318SMvMsZonSQNoTVLKRmc+v0beJmSeJhDtj8D2SgCnVd0UuF57cqeZDX0x794JALhcJNxKZG4govy8PFpFRzPJrIjMHQLd67Yjo9ExG11TCJnp0muRPDExBEJwhEq41hhYBaC8v2qWKG5yzH3LOLQOAXC73YebwaYAeI6J+HZkEERFAlzLLxiCQaQCCTtMc4mAKgqCZWZYZk1kO4MR6nVTVA7rI2kJf5wqzARQBdBeR+zKZ7DoiDNufyRDRYcbQDGZZz8wXdZrn0ARTV+ZwrjGZjUQ0ur0Oqni6XC4NtNZeAeDNuMKbKBJuBOgKIjL1waLvAIC1tqUBqPoQmW8xyy9EZHCnmQ4hMAVBeAGgn28fRLoZ0NHOFUa0traui0F0EbNsJDJfblD27wL0CzEAAWCH9+VjVbG0AahOA+i/RWSJiPTsNNcft1CqaDtKRGcBdGlVm3dU/W3Oubm7S7SmcGA2q/OJaGjjIfQBa+2NAHYklZy1dltyl5lPI6IFADXwQLrYWnv5vi4wnw/PzmTwwzobZBMRXlTVXwJY4Jzb0gmJ9+CZmMPrK18Lr1trxxeL+hFVPAMA3ut91hb6tQEpPEpEFjc1YXUjIKliealUPNla+w8xkEIRmQHQVpFwXRAEZwKAc+45a+1feo9xgL52UHcSUTNA51SqVfNqEMhlnZB4D1KPJ2Lm3nsm5zKVWQr1uKYUb7SFmcdU9f2ciLxWo+1jQRA078koyPTaz5YH9md9+Xx4dopkvbH6PjNfLRK+lRpnQicq3kPORETNROY7zOFPc7ncSbHHeDVW9oXM8rIxNJOIpEEomu6c7eecezTuO1REVhlDDwB0dA3PMMqYzEYRuT2+ZK210wFdcrAU4Jybb23hBEBXxbNa2NQkH+mExr5Ldk/jYng227RWtWlQsVhYwxzeQIRZDbMixVLAT04AGARBHyIzh4gu7EBO9aC1tPDAhbKyAplGzd5Q1WuIaEUlJ8S1xSLGVbU5UkTGqtIFAAwRit7j61FUWAbg/2o9NJfL9c9ms5NUqR+RvquKV7zHky0t9qla7Zn5NMCMBbS5ks/SRsA/4px7vk773oCZCGAgkRYArFLV7zvnngsCucUYGO/9z6Io+klV1x4iMkaVzkdFOR7wy5wz3wYKv6uii4YbY4bHO316EATDjDFnAxioSrsA/4Jz7l4ANlsTYVl/WLEIEGnXPXL0vWWdqp/gnFuRZPHMfBORubExAHVFqURXF4t2TXruAKI/xK5yzj0rEv5PhV+jUdVhuuJdAUqpwxicJRLOKxb1zGLRrkp1OYI5nE+Ei9v6EIiATAYTRGSJtfbSPYERLiXCmL3qIpjrmGWBc/bqKiD9FWB+RIQuqT7nEtHNzDyLiG6szNHMBPCTtrWEU4zBl6rXApgRIpivyhOdc19pW6MZDtCtcd9NxmBJyvkAMJ8WkUnW0iDTwOD17u8AdIK1hYExkNJHLzc2eOYmVX+hc/Zvi8XCmlgxo5llQz6fP6ZjleeBEVVNlN4tl8v1j3fmWQmQAP1asaiDrS2Eqv50VfwngG7ZLJ4AELYZWhYlQFLVJ7wv/72qvwjQJ+OljAsCuSnVfn4MpJ3lMv7O2gJZW6CEriGiL4jIJ1KV99FE5qk2IOkiVX++9xivqivq2UBEzkuApKrbVHF9uaznqvqJSfFDZOYmxdFeOZHBEkD/w3tcpuovBvR78Xp6iuis7D4quwzgXufsTQDeiZV9hjGZe9AOY55wTaqY6Zy9G0BLJQyEJ2cymLe/jPkBCIpb2nZdUy+g9TfGmC/Ga/+Fc3ZcypP9HMAYZnmFiD4QBPKpKLKLmXkIEV0Qh/+vO2c/mxpgqYh8D6CRxtAkADPi60erYrmqfq2lxe6mMay194vIFQANVqURAJ6ogM9/ETBHxGNc75ydkxrjIebw6Vo6VcW82Bu96Zw9JSGdAXwfwMMi4XoARxhj5gIYWKP/w87ZS1KXvsEsG4ioryqGZjsOJCz3vvz5lpaW38Ygao7zogaMuXoiLLbWTk1NvoeIzFTVy9pjzA+++Na2QwHNVrwNnRvD67s1OrxNRM8BOIuIzgawGMDuqtj70m3VHYpF3NzUpCvjn38G4C3n7Jg6EzpcFd2IACI9MVW4fCzhAJ0rzNlrFR53ZDJ7gikIguFEdFxM+dydskUi2wFdANDNAJ2Sy+UGtLa2/qrqyffW2IDPA+hLRP2yHfBGmwGdnBzkAujCHN4C6DVElGsEwHK5NKG1tfXXSaXOHF4HYCqALkT4IxOzmw7JZLA9n8/3TOUHs0XC2e2stk/c8sPJlZaWlg17g8muKhaxqkYIGgXgE6r0QUCPAXA0EYVtuky/tUG9Yv2urTWTlpbCSpGwem3NqXD1qzq2XkOxUTKZzABgr3av7F3gqEsykHbBVCqZbxWLhSmpBV8J0O0AureXwqjqZiJMdM4+lkoYLwJoFhGObYdE9O1h88CDSYcCBFW1ztkX8vn88ambv1HF9vpzx4b4b6LTtzvO9clDAI1LJetvq+J57/FjIh1NRKdWzbNU0b/WK1Nr6XF323KZCnXs9laywYno8H21QbtgKhYLv4xd5AhjMvMADGiglxpHLzIom8V8Ijq9oV8wpiXecbsOttdi5r8moiGxKp+MPctbItlY0f4+59zdHXhUwuIfAeCwerRBCkifTIAE6OJSqTQ35ckhImNqePyXidCTqM0LVoW0wTWS5zdS3qRP7dlkjk0Ba/t+kZYN5Egic3sjIO199IIeIvJgUxOtagQkVf2u9+W+yZmdc/aauJLZcTCAFATBsQA9mlJ2koe8qaqxx6GRdcDwIHP4NDNfG+crP08B9LwaY13cxshzbwCDUwn35WkgAegB0KAaXjCpOg9Pxt3zfmZa9TVr7bMpYI2uvZl1bKrA+NnvCUzmgXw+TJK8N5yzQ70vX6KqW2s0/nGpVBwQRfbKOKkLgiCcwiybARrfYPy13pdHOGfPj6Jok4j0TI5irLX3W1s4ThVzfn8EpjYHQTA89fmoiPyzMZlVRBTTEnqVtXZlynAPx98+JiK3pnHBzLMAGh9XTlsAIIrsI23JLc1papI0GAIic02y9pjk3ZYC5lUp0B2XvOYcz6tX6jkLAeyMS/m7mGUhM48OgnA8szxDhBG1iFlAF8XzGhm/u5/m0qYB9PF4cy+okaA31q9I2E4c1CfL5fKklpaWF9vWKJOJMBWgLUQ6yVr7RGonfgqg2UTUu8G4r3uvU6PIPpgi7f4J0OlExID+0Ht/ZRRFm5PKEcDfRFH0b/vhdc4yJvOjDtVyHuOjqPBQ1eWuIuEKACfFv3eq6ksATiKiIFb+487ZT6b0MIbILE153g0AbQW0HxEdo6pRqYTTi0W7ipmPITKrARyZpAoAXk0igSq+QoTr4u8vOodhQOF3zDwUoB+kk/S28fydRCY+wNeZ1tqb2jyZvFA54AZU8S6g64noBMSvEKlivXOFIQDejQE+PSEtVX3v6jcrKmem9LkOhDk6L5PJ/pZZFsRlbBRFdoZz1Oxc4fgESCIymFlWEJlvNgaSfsnaQt8ESPl8eA6zvESEf6kAqeIFjMlsCgK5pbLbo037A6QOVKobK8Sb3qHqe9UAEgDssrYwXFXvAfA6gMOJ6NQESN7rrWkgxSHi0VKpOEBVl8Uhsh8RhsVAWlkul4YkjLlzbmupVDxDFT9NCFMAA1SxXtV/xrnCRFVMUdX/JcLxQVAO4n4rVP3JqrpQFcvjdUwvFjHIOXdnOvVNfd/pnD1RFVMAbCdClzi576qqW1X9tc4V+idA2mfPFL/vczeA/g3avq3qpzvn5qVQ2VOVZhPhkg4Y7juqfnIURS8n3sYYMx+onYukks31quWRiZf6Q0sQBMNiNr4cRdHqRgl27FX/whjzrrX2lUq4qZ+fMnMzgG3JOWedPG0UgEEAtllr76++39Qkg5qaaFUF7OVLoih6uANreeY9pxF7xmu6Pa5C2jPuN50rfKbizWVHmzepnxep+qtS53ciItMAmtoRjosIE61toxg6ZbetFqhqAdD+1cBjDu8kwuQKvYNTWlsLaw/K+UHV727M4W2ATiCiOrSBPmWtHQmgi0i4qx0ovOY9TYtDh8a5xFiA5nQgp9qlihnOFe6qctOdUpHuzLKaiHpV8h7/VSJ61nvqRoRziPDp2AZ7HSgfTDBVaOp8/oOZTOau2iGofTCpakSEL1tr7wBQiJ93gjGZxR2gCMrx0cu0/akm3k+Sy+UGZLPZh+q97uy93hdFdnKjMHzAwZSKqWcSZRYS4UMdAZMqHonfa0oy/i7M4Yz2Pd3uvsvL5eKEKp6lUxqHvFNV9QzADAHQCviV3vsfpCrwgybtGjh+qWoAM/8jkZkO4M/rQOEFVZ3gnPuvWkR6HXo/AdFLRDrZOfvvndDYd4k5sZWH2ry7MYd3McvjbV5HtgRB+NkOeLhmZnm86r3uncw8EUBTJyTev5L+/zjZx7L6oyLhOmZZCKB7pyr/tOT/ARSHOjpyupj3AAAAAElFTkSuQmCC";
const EXTRA_LIBS = {"en-US":[{"title":"Tone range","kind":"phrases","hint":"Read each line varying your register. Natural, not an announcer voice.","items":[{"text":"Prosecutors have opened a sweeping investigation into alleged match-fixing and illegal betting."},{"text":"Different telescope designs work in different ways and have distinct strengths and weaknesses."},{"text":"We can keep on training good lawyers."},{"text":"Feedback should be timely and accurate throughout the whole project."},{"text":"Humans also estimate distance using the relative size of objects."},{"text":"Learn how to set up a wireless network."},{"text":"They can be eaten fresh, cooked, or fermented."},{"text":"I let the positive outweigh the negative."},{"text":"Instead of fixing it, they just give it a nickname."},{"text":"Let's cheer each other on."}]},{"title":"Conversational phrases","kind":"phrases","hint":"Everyday conversation. Natural tone, like talking to a friend.","items":[{"text":"Hey, how's it going? I'll be there in about ten minutes."},{"text":"Can you help me with this for a sec?"},{"text":"That sounds like a great idea."},{"text":"Tell me what you think."},{"text":"Okay, but hear me out for a second."},{"text":"Honestly, that's not a bad idea now that I think about it."},{"text":"I don't know, maybe? It depends."},{"text":"Wait, when did that happen?"},{"text":"Yeah, that makes sense. Totally logical."},{"text":"I swear I had it right here a second ago."},{"text":"You know what, I'm just gonna let it go."},{"text":"Same here, honestly. I get it completely."}]},{"title":"Questions","kind":"phrases","hint":"Vary the intonation of each question. Avoid a flat pattern.","items":[{"text":"What time is it right now?"},{"text":"Do you know where the nearest store is?"},{"text":"Can you show me how that's done?"},{"text":"Is there anything else I should know?"},{"text":"Seriously?"}]},{"title":"Emotions","kind":"phrases","hint":"The same line with different emotions. Perform the one indicated.","items":[{"text":"I can't believe it!","emotion":"Excited"},{"text":"I can't believe it...","emotion":"Disappointed"},{"text":"This is amazing!","emotion":"Genuine joy"},{"text":"It's amazing.","emotion":"Sad"},{"text":"Are you serious?","emotion":"Angry"},{"text":"Are you serious?","emotion":"Playful"},{"text":"Oh my gosh, I completely forgot!","emotion":"Nervous"},{"text":"Oh my gosh, I completely forgot.","emotion":"Guilty"},{"text":"I can't believe it.","emotion":"Exasperated"},{"text":"I can't believe it.","emotion":"Delighted surprise"},{"text":"Finally!","emotion":"Relief"},{"text":"Will we figure it out?","emotion":"Uncertain"}]},{"title":"Personal identity & style","kind":"phrases","hint":"Lines with personality. Bring your own style.","items":[{"text":"You're the best."},{"text":"Alright, let's get to work."},{"text":"Perfect, I've got this."},{"text":"This is exactly what I needed."},{"text":"Just a little reminder to stay focused and keep going."}]},{"title":"Welcome messages","kind":"phrases","hint":"Agent opening greetings. One per take.","items":[{"text":"Hi, I'm your new AI assistant. I'm here to help with questions about your account. How can I help you today?","title":"Greeting 1"},{"text":"Hello, this is Alex from Chase. How can I help you today?","title":"Greeting 2"},{"text":"Hi! I'm the virtual assistant for Delta. What can I do for you?","title":"Greeting 3"},{"text":"Thanks for calling Verizon. How can I help?","title":"Greeting 4"},{"text":"Hi there! I'm the AI assistant for Wealthfront. How can I help you today?","title":"Greeting 5"},{"text":"Hello, I'm your virtual scheduling specialist. Would you like to book a new appointment or change an existing one?","title":"Greeting 6"},{"text":"Hi, I'm your customer support assistant for Walgreens. How can I help you today?","title":"Greeting 7"},{"text":"Hello, I'm Alice, your virtual assistant. To start, could you give me your reservation or confirmation number?","title":"Greeting 8"},{"text":"Hi! I'm the smart assistant for Bank of America and I'm here to help. How are you doing?","title":"Greeting 9"},{"text":"Thanks for calling Marriott. Calls are recorded for quality and training. Who do I have the pleasure of speaking with?","title":"Greeting 10"}]},{"title":"Fillers","kind":"phrases","hint":"Natural filler lines with an assigned tone. Short clips.","items":[{"text":"Alright. Your invoice due date will be moved to the 23rd, and it may vary slightly each month.","emotion":"Reassuring"},{"text":"I understand. The fee applies in case the payment isn't received before the due date.","emotion":"Reassuring"},{"text":"One moment. I can identify the charge, but I can't remove that late fee from here.","emotion":"Understanding"},{"text":"Let me see. I'm pulling up your account details right now.","emotion":"Inquisitive"},{"text":"Let me check. I don't see a wire transfer from today, but there is one from two days ago.","emotion":"Neutral"},{"text":"One moment. I don't see a refund request on that account.","emotion":"Concerned"},{"text":"Great. I've updated your billing preferences accordingly.","emotion":"Enthusiastic"},{"text":"Ah, I see. The late fee on the invoice is forty-six dollars and eight cents.","emotion":"Reassuring"},{"text":"Alright, let me check. Your available balance is one thousand two hundred forty-five dollars in the account ending in four four three five.","emotion":"Neutral"},{"text":"Got it. Could you tell me the reason you'd like to return the item?","emotion":"Inquisitive"},{"text":"Of course, take your time. Let me know when you're ready to continue.","emotion":"Helpful"},{"text":"Yes, exactly. That's why Nick didn't receive his wire transfer.","emotion":"Reassuring"}]},{"title":"Numbers · individual","kind":"phrases","hint":"Clear, separated digits.","items":[{"text":"One at a time: zero, one, two, three, four, five, six, seven, eight, nine."},{"text":"In reverse: nine, eight, seven, six, five, four, three, two, one, zero."},{"text":"Digit by digit: six, four, two — eight, one, nine — zero, three, five."},{"text":"Confirm the code digit by digit: seven, seven, two, three."}]},{"title":"Numbers · in context","kind":"phrases","hint":"Numbers inside real sentences.","items":[{"text":"The refund total is one hundred fifty-four dollars and forty-nine cents."},{"text":"Your appointment is at eight thirty in the morning."},{"text":"Your case number is two, zero, two — zero, zero, nine — four, two, one."},{"text":"The deadline is September fifteenth, twenty twenty-four."},{"text":"Usage went up forty percent this month."},{"text":"There are three thousand two hundred forty-five customers affected."}]},{"title":"30-second CSR","kind":"phrases","hint":"Short customer-service scripts with style and tone.","items":[{"text":"Hi, I'm your virtual customer-service assistant. I'm here to help with any questions about your account, recent purchases, or technical support. How can I help you today?","emotion":"Neutral"},{"text":"I understand you're having trouble logging into your account. Let's fix it together. First, make sure Caps Lock is off. Then try clearing your browser cache and cookies. If you still can't get in, we can reset your password. Would you like to try these steps first?","emotion":"Reassuring"},{"text":"Let me check your order details. I see order number eight-five-two-seven-one from March fifteenth. It totals one hundred fifty-four dollars and forty-nine cents and is out for delivery on March twentieth. Would you like me to email you the tracking info?","emotion":"Neutral"},{"text":"I'm so sorry your new device isn't working as it should. That must be frustrating, especially with your presentation coming up. Let me help you fix this.","emotion":"Concerned"},{"text":"I've successfully processed your refund for the returned items. The full amount will be credited to your original payment method within three to five business days.","emotion":"Enthusiastic"},{"text":"I completely understand this delayed delivery is causing a lot of inconvenience. I'm escalating this to our priority shipping team right now.","emotion":"Concerned"},{"text":"Your flight has been successfully rebooked. The new departure is at two fifteen p.m. on Tuesday, March twelfth, from Terminal B, Gate twenty-three.","emotion":"Neutral"},{"text":"Welcome back. I see this is your first login since we updated our mobile banking interface. Would you like a quick tour of the new features?","emotion":"Enthusiastic"}]},{"title":"Longform · CSR","kind":"scripts","hint":"Full scenario. Read it in your own words.","items":[{"title":"Scenario 1 · Property management","scenario":"You're the virtual assistant for a property manager. The tenant is calling to report a maintenance issue in their rental apartment.","steps":["Greet and introduce yourself, closing with: “Hi, you've reached the virtual assistant. How can I help you today?”","Empathize (“Sorry to hear that, let's sort it out right now”) and ask for their name and the apartment address.","Verify identity: ask them to confirm their name and their move-in date; open their file.","Ask them to describe in more detail what's going on.","Ask whether it's stopping them from using the apartment safely right now (standing water, gas smell, exposed wiring).","If it isn't an emergency, schedule a routine maintenance visit and offer two time windows.","Confirm the booking, give the work-order number digit by digit, and close warmly."]}]},{"title":"Roleplay · CSR","kind":"scripts","hint":"Guided scenario, step by step.","items":[{"title":"Roleplay 1 · Food delivery","scenario":"You're a customer-service agent for a food-delivery company. The customer is calling because their order never arrived.","steps":["Greet warmly and introduce yourself (“Thanks for calling, how can I help you today?”).","Empathize (“I'm sorry to hear that, I'll do everything I can to help right away”).","Collect customer info: full name, phone or email on the account, order number, delivery address.","Ask the specific problem, offering common categories (never arrived, wrong items, missing items, cold or spoiled food, late, wrong charge).","Ask the date and time of the order and which restaurant it was placed with.","Resolve: offer a refund as credit or to the original payment method, per company policy.","Communicate the resolution: state the action, give the timeframe (three to five business days), provide the case number.","Close: ask if there's anything else, apologize again, and thank them for their patience."]}]}],"de-DE":[{"title":"Tonumfang","kind":"phrases","hint":"Lies jede Zeile mit variierendem Register. Natürlich, keine Ansagerstimme.","items":[{"text":"Die Staatsanwaltschaft hat umfangreiche Ermittlungen wegen mutmaßlicher Spielabsprachen und illegaler Wetten eingeleitet."},{"text":"Verschiedene Teleskop-Bauweisen funktionieren unterschiedlich und haben eigene Stärken und Schwächen."},{"text":"Wir können weiterhin gute Anwälte ausbilden."},{"text":"Rückmeldungen sollten während des gesamten Projekts zeitnah und präzise sein."},{"text":"Auch Menschen schätzen Entfernungen anhand der relativen Größe von Objekten."},{"text":"Erfahren Sie, wie man ein WLAN einrichtet."},{"text":"Man kann sie frisch, gekocht oder fermentiert essen."},{"text":"Ich lasse das Positive über das Negative überwiegen."},{"text":"Statt es zu reparieren, geben sie ihm einfach einen Spitznamen."},{"text":"Lasst uns einander anfeuern."}]},{"title":"Alltagssätze","kind":"phrases","hint":"Alltägliches Gespräch. Natürlicher Ton, wie mit einem Freund.","items":[{"text":"Hey, wie läuft's? Ich bin in etwa zehn Minuten da."},{"text":"Kannst du mir kurz hiermit helfen?"},{"text":"Das klingt nach einer super Idee."},{"text":"Sag mir, was du denkst."},{"text":"Okay, aber hör mir kurz zu."},{"text":"Ehrlich gesagt keine schlechte Idee, wenn ich so darüber nachdenke."},{"text":"Ich weiß nicht, vielleicht? Kommt drauf an."},{"text":"Moment, wann ist das passiert?"},{"text":"Ja, das ergibt Sinn. Völlig logisch."},{"text":"Ich schwöre, ich hatte es gerade eben noch hier."},{"text":"Weißt du was, ich lass es einfach gut sein."},{"text":"Geht mir genauso, ehrlich. Ich verstehe dich total."}]},{"title":"Fragen","kind":"phrases","hint":"Variiere die Betonung jeder Frage. Vermeide ein monotones Muster.","items":[{"text":"Wie spät ist es gerade?"},{"text":"Wissen Sie, wo der nächste Laden ist?"},{"text":"Können Sie mir zeigen, wie das geht?"},{"text":"Gibt es noch etwas, das ich wissen sollte?"},{"text":"Im Ernst?"}]},{"title":"Emotionen","kind":"phrases","hint":"Derselbe Satz mit unterschiedlichen Emotionen. Spiele die angegebene.","items":[{"text":"Ich kann es nicht glauben!","emotion":"Begeistert"},{"text":"Ich kann es nicht glauben...","emotion":"Enttäuscht"},{"text":"Das ist unglaublich!","emotion":"Echte Freude"},{"text":"Es ist unglaublich.","emotion":"Traurig"},{"text":"Ist das dein Ernst?","emotion":"Wütend"},{"text":"Ist das dein Ernst?","emotion":"Verspielt"},{"text":"Oh Gott, das habe ich völlig vergessen!","emotion":"Nervös"},{"text":"Oh Gott, das habe ich völlig vergessen.","emotion":"Schuldig"},{"text":"Ich kann es nicht glauben.","emotion":"Genervt"},{"text":"Ich kann es nicht glauben.","emotion":"Angenehme Überraschung"},{"text":"Endlich!","emotion":"Erleichterung"},{"text":"Ob wir das hinkriegen?","emotion":"Unsicher"}]},{"title":"Persönliche Identität & Stil","kind":"phrases","hint":"Sätze mit Persönlichkeit. Bring deinen eigenen Stil ein.","items":[{"text":"Sie sind der Beste."},{"text":"Also gut, an die Arbeit."},{"text":"Perfekt, das kriege ich hin."},{"text":"Genau das habe ich gebraucht."},{"text":"Nur eine kleine Erinnerung, konzentriert zu bleiben und weiterzumachen."}]},{"title":"Begrüßungen","kind":"phrases","hint":"Eröffnungsbegrüßungen des Agenten. Eine pro Aufnahme.","items":[{"text":"Hallo, ich bin Ihr neuer KI-Assistent. Ich helfe Ihnen bei Fragen zu Ihrem Konto. Wie kann ich Ihnen heute helfen?","title":"Begrüßung 1"},{"text":"Hallo, hier ist Alex von der Deutschen Bank. Wie kann ich Ihnen heute helfen?","title":"Begrüßung 2"},{"text":"Hallo! Ich bin der virtuelle Assistent der Lufthansa. Was kann ich für Sie tun?","title":"Begrüßung 3"},{"text":"Danke für Ihren Anruf bei der Telekom. Wie kann ich helfen?","title":"Begrüßung 4"},{"text":"Hallo! Ich bin der KI-Assistent von Trade Republic. Wie kann ich Ihnen heute helfen?","title":"Begrüßung 5"},{"text":"Hallo, ich bin Ihr virtueller Terminassistent. Möchten Sie einen neuen Termin buchen oder einen bestehenden ändern?","title":"Begrüßung 6"},{"text":"Hallo, ich bin Ihr Kundenservice-Assistent von DM. Wie kann ich Ihnen heute helfen?","title":"Begrüßung 7"},{"text":"Hallo, ich bin Alice, Ihre virtuelle Assistentin. Zu Beginn: Können Sie mir Ihre Reservierungs- oder Bestätigungsnummer nennen?","title":"Begrüßung 8"},{"text":"Hallo! Ich bin der smarte Assistent der Sparkasse und bin für Sie da. Wie geht es Ihnen?","title":"Begrüßung 9"},{"text":"Danke für Ihren Anruf bei DHL. Anrufe werden zu Qualitäts- und Schulungszwecken aufgezeichnet. Mit wem habe ich das Vergnügen?","title":"Begrüßung 10"}]},{"title":"Fillers","kind":"phrases","hint":"Natürliche Füllsätze mit zugewiesenem Ton. Kurze Clips.","items":[{"text":"In Ordnung. Ihr Fälligkeitsdatum wird auf den 23. verschoben, es kann jeden Monat leicht variieren.","emotion":"Beruhigend"},{"text":"Ich verstehe. Die Gebühr fällt an, falls die Zahlung nicht vor dem Fälligkeitsdatum eingeht.","emotion":"Beruhigend"},{"text":"Einen Moment. Ich kann die Buchung sehen, aber die Mahngebühr kann ich von hier aus nicht entfernen.","emotion":"Verständnisvoll"},{"text":"Lassen Sie mich sehen. Ich rufe gerade Ihre Kontodaten auf.","emotion":"Neugierig"},{"text":"Lassen Sie mich nachsehen. Ich sehe keine Überweisung von heute, aber eine von vor zwei Tagen.","emotion":"Neutral"},{"text":"Einen Moment. Ich sehe keinen Erstattungsantrag auf diesem Konto.","emotion":"Besorgt"},{"text":"Super. Ich habe Ihre Abrechnungseinstellungen entsprechend aktualisiert.","emotion":"Begeistert"},{"text":"Ah, verstehe. Die Mahngebühr auf der Rechnung beträgt sechsundvierzig Euro und acht Cent.","emotion":"Beruhigend"},{"text":"Also gut, lassen Sie mich nachsehen. Ihr verfügbares Guthaben beträgt eintausendzweihundertfünfundvierzig Euro auf dem Konto mit der Endziffer vier vier drei fünf.","emotion":"Neutral"},{"text":"Verstanden. Können Sie mir den Grund nennen, warum Sie den Artikel zurückgeben möchten?","emotion":"Neugierig"},{"text":"Natürlich, lassen Sie sich Zeit. Sagen Sie Bescheid, wenn Sie bereit sind fortzufahren.","emotion":"Hilfsbereit"},{"text":"Ja, genau. Deshalb hat Nick seine Überweisung nicht erhalten.","emotion":"Beruhigend"}]},{"title":"Zahlen · einzeln","kind":"phrases","hint":"Klare, einzeln gesprochene Ziffern.","items":[{"text":"Eine nach der anderen: null, eins, zwei, drei, vier, fünf, sechs, sieben, acht, neun."},{"text":"Rückwärts: neun, acht, sieben, sechs, fünf, vier, drei, zwei, eins, null."},{"text":"Ziffer für Ziffer: sechs, vier, zwei — acht, eins, neun — null, drei, fünf."},{"text":"Bestätigen Sie den Code Ziffer für Ziffer: sieben, sieben, zwei, drei."}]},{"title":"Zahlen · im Kontext","kind":"phrases","hint":"Zahlen in echten Sätzen.","items":[{"text":"Der Erstattungsbetrag beträgt einhundertvierundfünfzig Euro und neunundvierzig Cent."},{"text":"Ihr Termin ist um halb neun am Morgen."},{"text":"Ihre Fallnummer lautet zwei, null, zwei — null, null, neun — vier, zwei, eins."},{"text":"Die Frist ist der fünfzehnte September zweitausendvierundzwanzig."},{"text":"Der Verbrauch ist diesen Monat um vierzig Prozent gestiegen."},{"text":"Es sind dreitausendzweihundertfünfundvierzig Kunden betroffen."}]},{"title":"30-Sekunden-CSR","kind":"phrases","hint":"Kurze Kundenservice-Skripte mit Stil und Ton.","items":[{"text":"Hallo, ich bin Ihr virtueller Kundenservice-Assistent. Ich helfe Ihnen bei Fragen zu Ihrem Konto, letzten Einkäufen oder technischem Support. Wie kann ich Ihnen heute helfen?","emotion":"Neutral"},{"text":"Ich verstehe, dass Sie Probleme beim Anmelden haben. Lassen Sie es uns gemeinsam lösen. Prüfen Sie zuerst, ob die Feststelltaste aus ist. Leeren Sie dann den Cache und die Cookies Ihres Browsers. Wenn Sie sich immer noch nicht anmelden können, setzen wir Ihr Passwort zurück. Möchten Sie diese Schritte zuerst versuchen?","emotion":"Beruhigend"},{"text":"Lassen Sie mich Ihre Bestelldetails prüfen. Ich sehe Bestellnummer acht-fünf-zwei-sieben-eins vom fünfzehnten März. Sie beläuft sich auf einhundertvierundfünfzig Euro und neunundvierzig Cent und ist am zwanzigsten März in Zustellung. Soll ich Ihnen die Sendungsverfolgung per E-Mail schicken?","emotion":"Neutral"},{"text":"Es tut mir sehr leid, dass Ihr neues Gerät nicht wie erwartet funktioniert. Das muss frustrierend sein, gerade mit Ihrer anstehenden Präsentation. Lassen Sie mich das beheben.","emotion":"Besorgt"},{"text":"Ich habe Ihre Erstattung für die zurückgesendeten Artikel erfolgreich bearbeitet. Der volle Betrag wird innerhalb von drei bis fünf Werktagen auf Ihr ursprüngliches Zahlungsmittel gutgeschrieben.","emotion":"Begeistert"},{"text":"Ich verstehe voll und ganz, dass diese verspätete Lieferung große Unannehmlichkeiten verursacht. Ich eskaliere das jetzt an unser Prioritäts-Versandteam.","emotion":"Besorgt"},{"text":"Ihr Flug wurde erfolgreich umgebucht. Der neue Abflug ist um vierzehn Uhr fünfzehn am Dienstag, dem zwölften März, von Terminal B, Gate dreiundzwanzig.","emotion":"Neutral"},{"text":"Willkommen zurück. Ich sehe, das ist Ihre erste Anmeldung seit unserem Update des Online-Bankings. Möchten Sie eine kurze Tour durch die neuen Funktionen?","emotion":"Begeistert"}]},{"title":"Langform · CSR","kind":"scripts","hint":"Vollständiges Szenario. Lesen Sie es in Ihren eigenen Worten.","items":[{"title":"Szenario 1 · Hausverwaltung","scenario":"Du bist der virtuelle Assistent einer Hausverwaltung. Der Mieter ruft an, um einen Wartungsfall in seiner Mietwohnung zu melden.","steps":["Begrüße und stelle dich vor, zum Abschluss: „Hallo, hier ist der virtuelle Assistent. Wie kann ich Ihnen heute helfen?“","Zeige Empathie („Das tut mir leid, das klären wir jetzt“) und frage nach Name und Adresse der Wohnung.","Identität prüfen: Name und Einzugsdatum bestätigen lassen; Akte öffnen.","Bitte um eine genauere Beschreibung des Problems.","Frage, ob es die sichere Nutzung der Wohnung gerade verhindert (stehendes Wasser, Gasgeruch, freiliegende Kabel).","Wenn es kein Notfall ist, plane einen regulären Wartungsbesuch und biete zwei Zeitfenster an.","Bestätige den Termin, nenne die Auftragsnummer Ziffer für Ziffer und verabschiede dich freundlich."]}]},{"title":"Rollenspiel · CSR","kind":"scripts","hint":"Geführtes Szenario, Schritt für Schritt.","items":[{"title":"Rollenspiel 1 · Essenslieferung","scenario":"Du bist Kundenservice-Agent eines Lieferdienstes. Der Kunde ruft an, weil seine Bestellung nie angekommen ist.","steps":["Begrüße herzlich und stelle dich vor („Danke für Ihren Anruf, wie kann ich Ihnen helfen?“).","Zeige Empathie („Das tut mir leid, ich tue alles, um sofort zu helfen“).","Erfasse die Kundendaten: vollständiger Name, Telefon oder E-Mail, Bestellnummer, Lieferadresse.","Frage nach dem konkreten Problem mit den üblichen Kategorien (nicht angekommen, falsche/fehlende Artikel, kalt oder verdorben, verspätet, falsche Abbuchung).","Frage nach Datum und Uhrzeit der Bestellung und nach dem Restaurant.","Löse: biete eine Erstattung als Guthaben oder auf das ursprüngliche Zahlungsmittel an, gemäß Richtlinie.","Kommuniziere die Lösung: nenne die Maßnahme, den Zeitrahmen (drei bis fünf Werktage) und die Fallnummer.","Beende das Gespräch: frage, ob du sonst helfen kannst, entschuldige dich erneut und danke für die Geduld."]}]}],"ca-ES":[{"title":"Gamma de tons","kind":"phrases","hint":"Llegeix cada frase variant el registre. Naturalitat, no veu de locutor.","items":[{"text":"La fiscalia ha obert una investigació massiva sobre presumptes amanys de partits i apostes il·legals."},{"text":"Els diferents dissenys de telescopis funcionen de manera diferent i tenen punts forts i febles distints."},{"text":"Podem continuar formant bons advocats."},{"text":"El retorn ha de ser oportú i precís al llarg de tot el projecte."},{"text":"Els éssers humans també calculen la distància fent servir la mida relativa dels objectes."},{"text":"Aprèn a configurar una xarxa sense fils."},{"text":"Es poden menjar frescos, cuinats o fermentats."},{"text":"Deixo que el positiu s'imposi sobre el negatiu."},{"text":"En lloc d'arreglar-ho, li posen un sobrenom."},{"text":"Animem-nos els uns als altres."}]},{"title":"Frases conversacionals","kind":"phrases","hint":"Conversa quotidiana. To natural, com amb un amic.","items":[{"text":"Hola, què tal? Arribaré d'aquí a uns deu minuts."},{"text":"Em pots ajudar amb això un moment?"},{"text":"Això sona com una idea estupenda."},{"text":"Digues-me què et sembla."},{"text":"D'acord, però escolta'm un segon."},{"text":"La veritat és que no és mala idea, ara que hi penso."},{"text":"No ho sé, potser? Depèn."},{"text":"Espera, quan va passar això?"},{"text":"Sí, té sentit. És totalment lògic."},{"text":"Et juro que ho tenia aquí fa un moment."},{"text":"Saps què, ho deixaré estar."},{"text":"A mi igual, la veritat. T'entenc perfectament."}]},{"title":"Preguntes","kind":"phrases","hint":"Varia l'entonació de cada pregunta. Evita el patró monòton.","items":[{"text":"Quina hora és ara mateix?"},{"text":"Saps on és la botiga més propera?"},{"text":"Em pots ensenyar com es fa això?"},{"text":"Hi ha res més que hauria de saber?"},{"text":"De debò?"}]},{"title":"Emocions","kind":"phrases","hint":"La mateixa frase amb emocions diferents. Interpreta la indicada.","items":[{"text":"No m'ho puc creure!","emotion":"Emocionat"},{"text":"No m'ho puc creure...","emotion":"Decebut"},{"text":"És increïble!","emotion":"Alegria genuïna"},{"text":"És increïble.","emotion":"Trist"},{"text":"De debò?","emotion":"Enfadat"},{"text":"De debò?","emotion":"Juganer"},{"text":"Déu meu, m'havia oblidat per complet!","emotion":"Nerviós"},{"text":"Déu meu, me'n vaig oblidar per complet.","emotion":"Culpable"},{"text":"No m'ho puc creure.","emotion":"Exasperat"},{"text":"No m'ho puc creure.","emotion":"Sorpresa encantada"},{"text":"Per fi!","emotion":"Alleujament"},{"text":"Ho resoldrem?","emotion":"Incert"}]},{"title":"Identitat i estil","kind":"phrases","hint":"Frases amb personalitat. Imprimeix el teu estil propi.","items":[{"text":"Ets el millor."},{"text":"Va, mans a l'obra."},{"text":"Perfecte, això ho controlo jo."},{"text":"Això és just el que necessitava."},{"text":"Només un petit recordatori per mantenir-te concentrat i seguir endavant."}]},{"title":"Missatges de benvinguda","kind":"phrases","hint":"Salutacions d'obertura de l'agent. Una per presa.","items":[{"text":"Hola, soc el teu nou assistent d'IA. Soc aquí per ajudar-te amb preguntes sobre el teu compte. En què et puc ajudar avui?","title":"Salutació 1"},{"text":"Hola, soc l'Alex de CaixaBank. En què et puc ajudar avui?","title":"Salutació 2"},{"text":"Hola! Soc l'assistent virtual de Vueling. Què puc fer per tu?","title":"Salutació 3"},{"text":"Gràcies per trucar a Naturgy. En què et puc ajudar?","title":"Salutació 4"},{"text":"Hola! Soc l'assistent d'IA de MyInvestor. En què et puc ajudar avui?","title":"Salutació 5"},{"text":"Hola, soc el teu especialista virtual de cites. Vols programar una cita nova o modificar-ne una d'existent?","title":"Salutació 6"},{"text":"Hola, soc el teu assistent d'atenció al client de Bon Preu. En què et puc ajudar avui?","title":"Salutació 7"},{"text":"Hola, soc l'Alícia, la teva assistent virtual. Per començar, em pots donar el teu número de reserva o de confirmació?","title":"Salutació 8"},{"text":"Hola! Soc l'assistent intel·ligent de Banc Sabadell i soc aquí per ajudar-te. Com estàs?","title":"Salutació 9"},{"text":"Gràcies per trucar a NH Collection. Les trucades es graven amb finalitats de qualitat i formació. Amb qui tinc el plaer de parlar?","title":"Salutació 10"}]},{"title":"Fillers","kind":"phrases","hint":"Frases de farciment naturals amb un to assignat. Clips curts.","items":[{"text":"D'acord. La data de venciment de la teva factura es canviarà al dia 23, amb una possible variació cada mes.","emotion":"Tranquil·litzador"},{"text":"Ho entenc. El càrrec s'aplica en cas que el pagament no es rebi abans de la data de venciment.","emotion":"Tranquil·litzador"},{"text":"Un moment. Puc identificar el càrrec, però no puc eliminar aquest recàrrec per pagament tardà des d'aquí.","emotion":"Comprensiu"},{"text":"Deixa'm veure. Estic consultant les dades del teu compte ara mateix.","emotion":"Inquisitiu"},{"text":"Deixa'm comprovar-ho. No he trobat cap transferència d'avui, però sí una de fa dos dies.","emotion":"Neutre"},{"text":"Un moment. No he trobat cap sol·licitud de devolució en aquest compte.","emotion":"Preocupat"},{"text":"Molt bé. He actualitzat les teves preferències de facturació.","emotion":"Entusiasta"},{"text":"Ah, d'acord. El recàrrec per pagament tardà a la factura és de quaranta-sis euros amb vuit cèntims.","emotion":"Tranquil·litzador"},{"text":"Molt bé, deixa'm veure. El teu saldo disponible és de mil dos-cents quaranta-cinc euros al compte acabat en quatre quatre tres cinc.","emotion":"Neutre"},{"text":"Entès. Em pots dir el motiu pel qual vols retornar l'article?","emotion":"Inquisitiu"},{"text":"És clar, pren-te el temps que necessitis. Digues-me quan estiguis a punt per continuar.","emotion":"Servicial"},{"text":"Sí, exactament. Per això en Nick no va rebre la seva transferència.","emotion":"Tranquil·litzador"}]},{"title":"Números · individuals","kind":"phrases","hint":"Dígits clars i separats.","items":[{"text":"Un per un: zero, u, dos, tres, quatre, cinc, sis, set, vuit, nou."},{"text":"En ordre invers: nou, vuit, set, sis, cinc, quatre, tres, dos, u, zero."},{"text":"Dígit a dígit: sis, quatre, dos — vuit, u, nou — zero, tres, cinc."},{"text":"Confirma el codi dígit a dígit: set, set, dos, tres."}]},{"title":"Números · en conjunt","kind":"phrases","hint":"Números dins de frases reals.","items":[{"text":"El total de la devolució és de cent cinquanta-quatre euros amb quaranta-nou cèntims."},{"text":"La teva cita és a dos quarts de nou del matí."},{"text":"El teu número de cas és el dos, zero, dos — zero, zero, nou — quatre, dos, u."},{"text":"El termini és el quinze de setembre de dos mil vint-i-quatre."},{"text":"El consum ha augmentat un quaranta per cent aquest mes."},{"text":"Hi ha tres mil dues-centes quaranta-cinc persones afectades."}]},{"title":"CSR · 30 segons","kind":"phrases","hint":"Guions breus d'atenció al client amb estil i to.","items":[{"text":"Hola, soc el teu assistent virtual d'atenció al client. Soc aquí per ajudar-te amb qualsevol pregunta sobre el teu compte, compres recents o assistència tècnica. En què et puc ajudar avui?","emotion":"Neutre"},{"text":"Entenc que tens problemes per iniciar sessió al teu compte. Ho resoldrem junts. Primer, comprova que la tecla de Bloq Maj estigui desactivada. Després, prova d'esborrar la memòria cau i les galetes del navegador. Si encara no pots entrar, podem restablir la contrasenya. Vols provar aquests passos primer?","emotion":"Tranquil·litzador"},{"text":"Deixa'm consultar les dades de la teva comanda. Veig la comanda número vuit-cinc-dos-set-u del quinze de març. Suma cent cinquanta-quatre euros amb quaranta-nou cèntims i està en repartiment el vint de març. Vols que t'enviï la informació de seguiment per correu?","emotion":"Neutre"},{"text":"Ho sento molt, entenc que el teu nou dispositiu no funcioni com hauria. Deu ser frustrant, sobretot tenint en compte la teva presentació. Deixa'm ajudar-te a resoldre-ho.","emotion":"Preocupat"},{"text":"He processat correctament la teva devolució pels articles retornats. L'import íntegre s'abonarà al teu mètode de pagament original en un termini de tres a cinc dies laborables.","emotion":"Entusiasta"},{"text":"Entenc perfectament que aquest retard en el lliurament t'està causant molts inconvenients. Ho escalo ara mateix al nostre equip d'enviaments prioritaris.","emotion":"Preocupat"},{"text":"El teu vol s'ha modificat correctament. La nova hora de sortida és les dues i quart de la tarda del dimarts, dotze de març, des de la Terminal B, porta vint-i-tres.","emotion":"Neutre"},{"text":"Benvingut de nou. Veig que és el primer cop que inicies sessió des que vam actualitzar la banca mòbil. Vols un recorregut ràpid per les noves funcions?","emotion":"Entusiasta"}]},{"title":"Guió llarg · CSR","kind":"scripts","hint":"Escenari complet. Llegeix-lo amb les teves paraules.","items":[{"title":"Escenari 1 · Gestió immobiliària","scenario":"Ets l'assistent virtual d'una gestora immobiliària. L'inquilí truca per informar d'una incidència de manteniment al seu pis de lloguer.","steps":["Saluda i presenta't, tancant amb: «Hola, l'atén l'assistent virtual. En què el puc ajudar avui?»","Empatitza («Em sap greu, ho resolem ara mateix») i demana el seu nom i l'adreça del pis.","Verifica la identitat: demana-li que confirmi el nom i la data en què va entrar a viure-hi; obre el seu expedient.","Demana-li que expliqui amb més detall què està passant.","Pregunta si li impedeix fer servir el pis amb seguretat ara mateix (aigua estancada, olor de gas, cables descoberts).","Si no és una emergència, programa una visita de manteniment ordinària i ofereix dues franges horàries.","Confirma la reserva, dona el número d'ordre dígit a dígit i acomiada't amb calidesa."]}]},{"title":"Rol · CSR","kind":"scripts","hint":"Escenari guiat, pas a pas.","items":[{"title":"Rol 1 · Comanda de menjar","scenario":"Ets agent d'atenció al client d'una empresa de repartiment de menjar. El client truca perquè la seva comanda no ha arribat mai.","steps":["Saluda amb calidesa i presenta't («Gràcies per trucar, en què el puc ajudar avui?»).","Empatitza («Em sap greu, faré tot el que pugui per ajudar-lo de seguida»).","Recull les dades del client: nom complet, telèfon o correu del compte, número de comanda, adreça de lliurament.","Pregunta quin és el problema concret, oferint les categories habituals (no va arribar, articles incorrectes o que falten, menjar fred o en mal estat, tardà, càrrec incorrecte).","Pregunta la data i l'hora de la comanda i a quin restaurant es va fer.","Resol: ofereix una devolució com a crèdit o al mètode de pagament original, segons la política.","Comunica la resolució: indica l'acció, el termini (tres a cinc dies laborables) i el número de cas.","Tanca: pregunta si hi ha res més, demana disculpes de nou i agraeix-li la paciència."]}]}]};
const DATA = {"instructions":"Objetivo: capturar respuestas naturales de atención al cliente (CSR). Imagina que respondes una llamada e intentas ayudar a un amigo o familiar en tu trabajo como CSR.\nReglas de lectura\n1. Habla con naturalidad, pero NO uses «voz de CSR».\n2. Evita las muletillas (ehhh, ummm, ahhh).\n3. No alargues las palabras.\n4. Cuida las oclusivas fuertes (p, b, t, d, k, g): sin pops.\n5. Evita la «entonación de duda».\n6. Ritmo lento y constante (~180 ppm), sin monótono.\n7. Varía entonación y emoción entre preguntas y afirmaciones.\nReglas técnicas de captura\nPersona y acento constantes. Una emoción por toma. Sin ruido, reverb, música ni solapamiento. WAV según estándar de la sesión.\nEn scripts largos y roleplay\nLéelo primero en silencio y dilo con tus palabras. Cada paso numerado es una guía, no una línea a leer literal.","sections":[{"title":"Gama de tonos","kind":"phrases","hint":"Lee cada frase variando el registro. Naturalidad, no voz de locutor.","items":[{"text":"Los fiscales han abierto una investigación masiva sobre presuntas irregularidades en el amaño de partidos y apuestas ilegales."},{"text":"Los distintos diseños de telescopios funcionan de manera diferente y tienen distintos puntos fuertes y débiles."},{"text":"Podemos seguir reforzando la formación de buenos abogados."},{"text":"La retroalimentación debe ser oportuna y precisa a lo largo de todo el proyecto."},{"text":"Los seres humanos también calculan la distancia utilizando el tamaño relativo de los objetos."},{"text":"Las iglesias no deberían fomentarlo ni hacerlo parecer inofensivo."},{"text":"Aprenda a configurar una red inalámbrica."},{"text":"Se pueden comer frescos, cocinados o fermentados."},{"text":"Si esto es cierto, quienes tienden a pensar de forma creativa son realmente diferentes de algún modo."},{"text":"Lo más probable es que salte de alegría y quiera pasar directamente a la luna de miel."},{"text":"El almíbar debe crear hilos muy finos de azúcar que caigan sobre los mangos."},{"text":"Pero, en realidad, en el gran esquema de las cosas, esta información es insignificante."},{"text":"Dejo que lo positivo se imponga sobre lo negativo."},{"text":"Se limpió la frente con el antebrazo."},{"text":"En lugar de arreglarlo, le ponen un apodo."},{"text":"Aproximadamente la mitad de las personas infectadas también pierden peso."},{"text":"La segunda mitad del libro se centra en la redacción de argumentos y ensayos."},{"text":"Tenemos los medios para ayudarnos a nosotros mismos."},{"text":"Los artículos de gran tamaño se introducen en contenedores para su eliminación."},{"text":"Le encanta verme beber esto."},{"text":"Aun así, es una elección de moda bastante peculiar."},{"text":"La financiación siempre es un problema a posteriori."},{"text":"Animémonos los unos a los otros."}]},{"title":"Frases conversacionales","kind":"phrases","hint":"Conversación cotidiana. Tono natural, como con un amigo.","items":[{"text":"Hola, ¿qué tal? Llegaré en unos diez minutos."},{"text":"¿Me puedes ayudar con esto un momento?"},{"text":"Eso suena como una idea estupenda."},{"text":"Dime qué te parece."},{"text":"Vale, pero escúchame un segundo."},{"text":"La verdad es que no es mala idea, ahora que lo pienso."},{"text":"No sé, ¿quizás? Depende."},{"text":"Espera, ¿cuándo pasó eso?"},{"text":"Sí, tiene sentido. Es totalmente lógico."},{"text":"Te juro que lo tenía aquí hace un momento."},{"text":"Sabes qué, lo voy a dejar estar."},{"text":"La verdad, igual. Te entiendo perfectamente."},{"text":"Casi se me olvida — ¿llegaste a sacar ese listo?"},{"text":"¿Verdad? O sea, exacto. Eso mismo dije yo."},{"text":"No, sigue, te escucho."},{"text":"Mire, el caso es que..."},{"text":"No le voy a engañar, eso sí que me sorprendió."},{"text":"Es que — sí. Sí, ya lo sé."},{"text":"Tiene razón, eso hay que reconocerlo."},{"text":"Ah, ya que lo menciona — quería preguntarle algo."},{"text":"¿Podemos detenernos un momento a valorar eso?"},{"text":"Tengo la sensación de que ya hemos tenido esta conversación antes.."},{"text":"Sí, pero eso es completamente distinto y usted lo sabe."},{"text":"Ni recuerdo cómo hemos llegado a este tema."},{"text":"Espera, ¿eso es hoy? Pensaba que era la semana que viene."}]},{"title":"Preguntas","kind":"phrases","hint":"Varía la entonación de cada pregunta. Evita el patrón monótono.","items":[{"text":"¿Qué hora es ahora mismo?"},{"text":"¿Sabe dónde está la tienda más cercana?"},{"text":"¿Puede enseñarme cómo se hace eso?"},{"text":"¿Hay algo más que debería saber?"},{"text":"¿En serio?"}]},{"title":"Emociones","kind":"phrases","hint":"La misma frase con emociones distintas. Interpreta la indicada.","items":[{"text":"¡No me lo puedo creer!","emotion":"Emocionado"},{"text":"No me lo puedo creer...","emotion":"Decepcionado"},{"text":"¡Es increíble!","emotion":"Alegría genuina"},{"text":"Es increíble.","emotion":"triste"},{"text":"¿En serio?","emotion":"Enojado"},{"text":"¿En serio?","emotion":"Juguetón"},{"text":"¡Dios mío, se me había olvidado por completo!","emotion":"Nervioso"},{"text":"Oh Dios mío, se me olvidó por completo.","emotion":"Culpable"},{"text":"No me lo puedo creer.","emotion":"Exasperado"},{"text":"No me lo puedo creer.","emotion":"Sorpresa encantada"},{"text":"¡Por fin!","emotion":"Alivio"},{"text":"Finalmente.","emotion":"Decepcionado"},{"text":"Ya me lo imaginaba.","emotion":"Seguro"},{"text":"Ya me lo imaginaba...","emotion":"Triste"},{"text":"¡No hay ningún problema!","emotion":"Amigable"},{"text":"Está bien.","emotion":"Triste"},{"text":"Lo resolveremos.","emotion":"Tranquilizador"},{"text":"¿Lo resolveremos?","emotion":"Incierto"}]},{"title":"Identidad y estilo","kind":"phrases","hint":"Frases con personalidad. Imprime tu estilo propio.","items":[{"text":"Es usted el mejor."},{"text":"Venga, manos a la obra"},{"text":"Perfecto, esto lo controlo yo."},{"text":"Esto es justo lo que necesitaba."},{"text":"Solo un pequeño recordatorio para mantenerse concentrado y seguir adelante."}]},{"title":"Mensajes de bienvenida","kind":"phrases","hint":"Saludos de apertura de agente. Uno por toma.","items":[{"text":"Hola. Soy el asistente virtual con inteligencia artificial de Iberia. Estoy aquí para ayudarle con cualquier pregunta sobre sus viajes con Iberia. ¿En qué puedo ayudarle hoy?","title":"Saludo 1"},{"text":"Hola, soy Alex de BBVA. ¿En qué puedo ayudarle hoy?","title":"Saludo 2"},{"text":"Hola, está hablando con una versión beta de Aplazame AI. Pregúnteme sobre capacidad de compra, devoluciones, pagos o cualquier otra cosa — cuanto más detalle, mejor.","title":"Saludo 3"},{"text":"¡Hola! Soy Finn, el asistente virtual de CaixaBank. ¿En qué puedo ayudarle?","title":"Saludo 4"},{"text":"Hola, gracias por llamar a Openbank. ¿En qué puedo ayudarle?","title":"Saludo 5"},{"text":"¡Hola! Soy el asistente virtual con inteligencia artificial de Wealth Simple. ¿En qué puedo ayudarle hoy?","title":"Saludo 6"},{"text":"¡Hola! Gracias por llamar a EasyPark. Estoy aquí para que su experiencia de aparcamiento sea lo más sencilla posible. ¿Desea iniciar una nueva sesión?","title":"Saludo 7"},{"text":"Hola, soy Alex, su especialista virtual en citas de Gestoría Asesor. ¿Desea programar una nueva cita o modificar una existente?","title":"Saludo 8"},{"text":"Hola, soy su agente virtual de Servihabitat, ¿en qué puedo ayudarle hoy?","title":"Saludo 9"},{"text":"Hola, soy su asistente de atención al cliente de Cobee, ¿en qué puedo ayudarle hoy?","title":"Saludo 10"},{"text":"Hola, soy Alice, su asistente virtual. Para comenzar, ¿podría indicarme su número de reserva o confirmación?","title":"Saludo 11"},{"text":"¡Hola! Soy el asistente inteligente de Santander y estoy aquí para ayudarle. ¿Cómo está usted?","title":"Saludo 12"},{"text":"Hola, soy Alex de El Corte Inglés. ¿En qué puedo ayudarle hoy?","title":"Saludo 13"},{"text":"Bienvenido a Banco Sabadell. Pregúnteme lo que quiera, ideas, respuestas rápidas... haré todo lo posible por ayudarle.","title":"Saludo 14"},{"text":"Hola, soy su asistente virtual de Glovo. ¿En qué puedo ayudarle con su pedido?","title":"Saludo 15"},{"text":"Hola, soy su asistente virtual de Quirónsalud, ¿en qué puedo ayudarle hoy?","title":"Saludo 16"},{"text":"Gracias por llamar a NH Collection. Las llamadas son grabadas con fines de control de calidad y formación. ¿Con quién tengo el placer de hablar?","title":"Saludo 17"},{"text":"¡Hola! Gracias por llamar a Roibos, la aplicación de finanzas familiares y seguridad. Nosotros y nuestros proveedores podemos supervisar y grabar esta llamada de acuerdo con nuestra Declaración de Privacidad. Si en algún momento no está satisfecho durante la llamada, diga simplemente «Representante». Me llamo Alex, ¿con quién tengo el placer de hablar?","title":"Saludo 18"},{"text":"Hola, soy el agente virtual de Glovo. Todas las comunicaciones conmigo están sujetas a la Política de Privacidad de Glovo, que puede consultar en Glovo punto com barra política de privacidad. ¿En qué puedo ayudarle hoy?","title":"Saludo 19"}]},{"title":"Fillers","kind":"phrases","hint":"Muletillas naturales con tono asignado. Clips cortos.","items":[{"text":"De acuerdo. La fecha de vencimiento de su factura se cambiará al día 23, con una posible variación cada mes.","emotion":"Tranquilizador"},{"text":"Entiendo. El cargo se aplica en caso de que el pago no se reciba antes de la fecha de vencimiento.","emotion":"Tranquilizador"},{"text":"Un momento. Puedo identificar el cargo, pero no puedo eliminar ese recargo por pago tardío desde aquí.","emotion":"Comprensivo"},{"text":"Déjeme ver. Estoy consultando los detalles de su cuenta ahora mismo.","emotion":"Inquisitivo"},{"text":"Déjeme comprobar. No he encontrado ninguna transferencia bancaria de hoy, pero sí una de hace dos días.","emotion":"Neutral/profesional"},{"text":"Un momento. No he encontrado ninguna solicitud de reembolso en esa cuenta.","emotion":"Preocupado"},{"text":"Muy bien. He actualizado sus preferencias de facturación en consecuencia.","emotion":"Entusiasta"},{"text":"Ah, de acuerdo. El recargo por pago tardío en la factura es de cuarenta y seis euros con ocho céntimos.","emotion":"Tranquilizador"},{"text":"Ah, de acuerdo. Puede darme el nombre del usuario autorizado.","emotion":"Tranquilizador"},{"text":"Bien. He encontrado la devolución sobre la que llama.","emotion":"Neutral/profesional"},{"text":"Déjeme verificarlo. No he encontrado ninguna cuenta con esa fecha de nacimiento. Vamos a intentar otra cosa.","emotion":"Preocupado"},{"text":"Un momento, por favor. Parece que su cuenta está bloqueada actualmente por tarifas pendientes de pago.","emotion":"Preocupado"},{"text":"Un momento, por favor. Veo que reservó un viaje de ida a Sevilla el 28 de febrero.","emotion":"Neutral/profesional"},{"text":"Ah, eso me ayuda a entender mejor la situación — lo tendré en cuenta.","emotion":"Entusiasta"},{"text":"Perfecto. He configurado sus pagos automáticos para que se repitan mensualmente.","emotion":"Entusiasta"},{"text":"Perfecto. He realizado su reserva en Foster's Hollywood para dos personas el 31 de marzo a las siete de la tarde.","emotion":"Entusiasta"},{"text":"Ah, entiendo. Eso explica por qué apareció el cargo en su extracto.","emotion":"Neutral/profesional"},{"text":"Bien. Por lo que me ha comentado, le recomendaría empezar con un plan de pago.","emotion":"Neutral/profesional"},{"text":"De acuerdo. Voy a derivar esto a nuestro equipo de facturación.","emotion":"Preocupado"},{"text":"Muy bien, veamos. Recibimos su último pago el catorce de abril.","emotion":"Neutral/profesional"},{"text":"Estupendo, gracias. Lo dejo anotado en su cuenta.","emotion":"Tranquilizador"},{"text":"Ah, entiendo. Parece que el mes pasado se aplicó un cargo duplicado.","emotion":"Preocupado"},{"text":"Buena pregunta. El abono suele tardar entre tres y cinco días hábiles en aparecer en su extracto.","emotion":"Entusiasta"},{"text":"De acuerdo, perfecto. Actualizo la dirección a calle Clarence, catorce, Sevilla.","emotion":"Neutral/profesional"},{"text":"De acuerdo, déjeme comprobarlo. No veo ninguna retención en su cuenta corriente terminada en dos dos tres ocho.","emotion":"Inquisitivo"},{"text":"De acuerdo, déjeme ver. Parece que su plan se renueva el 15 del mes que viene.","emotion":"Neutral/profesional"},{"text":"Entendido. ¿Podría decirme por qué desea devolver el artículo?","emotion":"Inquisitivo"},{"text":"De nada. ¿Hay algo más en lo que pueda ayudarle hoy?","emotion":"Entusiasta"},{"text":"De acuerdo, déjeme comprobarlo. ¡Parece que cumple los requisitos para esa promoción!","emotion":"Entusiasta"},{"text":"De acuerdo, déjeme ver. Su saldo disponible es de mil doscientos cuarenta y cinco euros en la cuenta terminada en cuatro cuatro tres cinco.","emotion":"Neutral/profesional"},{"text":"Muy bien, anotado. Me aseguraré de buscar únicamente billetes en primera clase.","emotion":"Neutral/profesional"},{"text":"De acuerdo, entiendo. Parece que su suscripción se renovó automáticamente la semana pasada.","emotion":"Comprensivo"},{"text":"Muy bien, gracias. Solo necesito el código postal de facturación para procesar su devolución.","emotion":"Neutral/profesional"},{"text":"De acuerdo, gracias. Déjeme consultar el historial de pedidos.","emotion":"Neutral/profesional"},{"text":"Muy bien. Haré la reserva a nombre de \"John Snow\".","emotion":"Seguro"},{"text":"Por supuesto. Le enviaré una confirmación a la dirección de correo electrónico que tenemos registrada.","emotion":"Entusiasta"},{"text":"Entendido. Veo un crédito pendiente de quince euros en su cuenta.","emotion":"Seguro"},{"text":"De acuerdo, un momento. He encontrado cinco transacciones recientes de Apple.","emotion":"Neutral/profesional"},{"text":"Ah, de acuerdo. Cambio la cita del jueves al viernes.","emotion":"Comprensivo"},{"text":"No hay problema. ¿Cuál es el motivo por el que necesita reemplazar su tarjeta: se la robaron, está dañada o la ha perdido?","emotion":"Tranquilizador"},{"text":"Perfecto, déjeme comprobarlo. Su próxima factura vence el 8 de septiembre.","emotion":"Neutral/profesional"},{"text":"Lo estoy consultando, un momento. Tengo una receta lista para usted — ¿sigue siendo este el medicamento que desea renovar?","emotion":"Servicial/Inquisitivo"},{"text":"Vamos a ver. Tenemos tres terapeutas entre los que puede elegir.","emotion":"Neutral/profesional"},{"text":"Por supuesto, tómese su tiempo. Dígame cuando esté listo para continuar.","emotion":"Servicial"},{"text":"Un momento... Parece que no tiene suficientes puntos para canjear el vuelo que intenta reservar.","emotion":"Preocupado"},{"text":"Entendido. Como estará fuera, puedo enviar el paquete para que llegue el lunes cuando regrese.","emotion":"Tranquilizador"},{"text":"De acuerdo, un momento... He reiniciado su router. Dígame si eso ha resuelto el problema.","emotion":"Tranquilizador"},{"text":"Entiendo... ¿Prefiere usar la tarjeta que tenemos registrada o una nueva?","emotion":"Inquisitivo"},{"text":"Un momento... La farmacia en Calle Mayor está abierta lunes a viernes, de nueve de la mañana a siete de la tarde.","emotion":"Neutral/profesional"},{"text":"Sí, coincide con lo que veo por mi parte.","emotion":"Tranquilizador"},{"text":"Sí, mire. Parece que la discrepancia en el saldo de la cuenta se debe a un reembolso que aún no se ha procesado completamente.","emotion":"Tranquilizador"},{"text":"Sí, por supuesto. Puedo estudiar la posibilidad de eximirle de la cuota anual.","emotion":"Tranquilizador"},{"text":"Sí, cómo no. Déjeme consultar esos detalles.","emotion":"Tranquilizador"},{"text":"Sí, entiendo. O sea que me está diciendo que el cargo apareció dos veces, ¿verdad?","emotion":"Seguro/Inquisitivo"},{"text":"Sí, entiendo. En ese caso, ¿preferiría cerrar o reabrir la reclamación?","emotion":"Seguro/Inquisitivo"},{"text":"Sí, de acuerdo. Permítame proceder a gestionarlo ahora mismo.","emotion":"Servicial"},{"text":"Sí, exactamente. Por eso Nick no recibió su transferencia bancaria.","emotion":"Tranquilizador"},{"text":"Sí, por supuesto. Entiendo por qué eso le resultaría frustrante.","emotion":"Tranquilizador"},{"text":"Sí, desde luego. Me aseguraré de recordárselo cuando tenga un pago próximo.","emotion":"Tranquilizador"},{"text":"Entonces... desearía realizar un pedido de tres patatas fritas, dos Iron Brus y una hamburguesa de pollo. ¿Es correcto?","emotion":"Inquisitivo"},{"text":"Bueno... dado que hace menos de veinticuatro horas que se entregó el paquete, ¿es posible que algún vecino lo haya recogido por error?","emotion":"Inquisitivo"},{"text":"De acuerdo. Para la nueva tarjeta, ¿prefiere envío estándar o urgente?","emotion":"Inquisitivo"},{"text":"Muy bien. Según el historial de su cuenta, usted cumple los requisitos para una exención por única vez.","emotion":"Seguro"},{"text":"Así es. Lamentablemente, los residentes de esa comunidad no cumplen los requisitos para la deducción fiscal.","emotion":"Empático"},{"text":"Y es por eso por lo que el cargo apareció en su cuenta.","emotion":"Empático"},{"text":"Y... ¿tiene pensado viajar con algún niño menor de cinco años?","emotion":"Inquisitivo"},{"text":"Entonces... procedo a configurarlo para usted.","emotion":"Servicial"},{"text":"Ahora bien... debería haberle llegado un mensaje de texto al número que termina en uno dos dos tres.","emotion":"Neutral/profesional"},{"text":"En cualquier caso... permítame concentrarme en resolver esto para usted.","emotion":"Servicial"},{"text":"Un momento. Antes de continuar, ¿hay algún detalle adicional sobre la reserva que deba saber?","emotion":"Preocupado"},{"text":"Perdone. ¿Era N de Navarra, o M de Madrid?","emotion":"Inquisitivo"},{"text":"Un momento. Déjeme consultar el pedido antes de continuar ayudándole.","emotion":"Preocupado"},{"text":"Espere un momento. Hay un descuento que puedo aplicarle, un segundo.","emotion":"Servicial"},{"text":"Pues... acabo de solucionar el problema. ¿Puede actualizar su navegador y comprobar si se ha resuelto?","emotion":"Entusiasta/Inquisitivo"},{"text":"Vamos a ver... Su cuenta muestra un saldo a favor de veintidós euros que podemos aplicar hoy mismo.","emotion":"Servicial/Inquisitivo"},{"text":"Por supuesto. Puedo guiarle paso a paso para restablecer su contraseña.","emotion":"Servicial"},{"text":"¡Claro que sí! Será un placer ayudarle con eso.","emotion":"Entusiasta"},{"text":"Sí. Su reembolso ha sido aprobado y aparecerá en un plazo de cinco a siete días laborables.","emotion":"Neutral/profesional"},{"text":"¡Exacto! Esa es precisamente la promoción que estaba a punto de mencionar.","emotion":"Entusiasta"},{"text":"Por supuesto. Voy a tomar nota de su preferencia y actualizaré su cuenta.","emotion":"Neutral/profesional"},{"text":"Por supuesto. ¿Hay algo más en lo que pueda ayudarle?","emotion":"Servicial"},{"text":"Desde luego. Entiendo que la política puede resultar confusa.","emotion":"Empático"},{"text":"Perfecto. Su nuevo plan entrará en vigor al inicio del próximo ciclo de facturación.","emotion":"Neutral/profesional"},{"text":"Ah, entiendo. Entonces el cargo original correspondía al plan anual, no al mensual.","emotion":"Comprensivo"},{"text":"Ah, de acuerdo. ¿Prefiere que empecemos de nuevo?","emotion":"Comprensivo"},{"text":"Perfecto, hecho. Ya he aplicado el código promocional a su cuenta.","emotion":"Servicial"},{"text":"Exacto. Y como es su primer pago con retraso, puedo eximirle de ese cargo como deferencia.","emotion":"Servicial"},{"text":"Entendido. Lo marcaré como prioritario y alguien se pondrá en contacto con usted en un plazo de veinticuatro horas.","emotion":"Neutral/profesional"},{"text":"Entendido. Entonces desea mantener la cuenta abierta pero cancelar la suscripción — puedo hacer eso.","emotion":"Comprensivo"}]},{"title":"CSR · 30 segundos","kind":"phrases","hint":"Guiones breves de atención al cliente con estilo y tono.","items":[{"text":"Hola, soy su asistente virtual de atención al cliente. Estoy aquí para ayudarle con cualquier pregunta o duda que pueda tener sobre su cuenta, compras recientes o asistencia técnica. ¿En qué puedo ayudarle hoy?","emotion":"Amigable y casual (Conversacional) · Neutral/profesional"},{"text":"Entiendo que tiene problemas para iniciar sesión en su cuenta. Vamos a resolverlo juntos. Primero, compruebe que la tecla Bloq Mayús esté desactivada en su teclado. Después, intente borrar la caché y las cookies de su navegador. Si sigue sin poder entrar, podemos restablecer su contraseña. ¿Le gustaría probar estos pasos primero?","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Déjeme consultar los detalles de su pedido. Veo que su pedido #85271 es del 15 de marzo. Incluye los auriculares inalámbricos por ciento veintinueve euros con noventa y nueve céntimos y la funda protectora por catorce euros con cincuenta céntimos, con un total de ciento cincuenta y cuatro euros con cuarenta y nueve céntimos. ... El paquete está actualmente en camino, con una fecha de entrega prevista para el 20 de marzo entre las 14:00 y las 17:00. ¿Le gustaría que le enviase la información de seguimiento por correo electrónico?","emotion":"Claro e instructivo (Conversacional) · Neutral/profesional"},{"text":"Lo siento mucho, entiendo que su nuevo dispositivo no funcione como debería. Debe de ser muy frustrante, sobre todo teniendo en cuenta que lo necesita para su próxima presentación. Permítame ayudarle a resolver este problema. Primero le guiaré a través de unos pasos de diagnóstico rápidos, y si no logramos solucionarlo, le pondré en contacto con nuestro equipo especializado de soporte técnico, que podrá ofrecerle una asistencia más avanzada.","emotion":"Claro e instructivo · Preocupado"},{"text":"He procesado correctamente su reembolso por los artículos devueltos del pedido #95173. Le explico el desglose... El importe íntegro de ciento treinta y cuatro euros con cincuenta céntimos se abonará en su método de pago original en un plazo de 3 a 5 días laborables. En breve recibirá un correo de confirmación con todos los detalles. ... ¿Hay algún aspecto del proceso de reembolso que desee que le aclare?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Me doy cuenta de que lleva más de dos años como valioso miembro de nuestro servicio de suscripción premium. Me encantaría contarle algunas de las nuevas funciones que hemos añadido y que podrían resultarle muy útiles. Recientemente hemos lanzado herramientas avanzadas de informes y hemos ampliado nuestro horario de atención al cliente a las 24 horas, los 7 días de la semana. ¿Le gustaría que le explicase estas novedades?","emotion":"Claro e instructivo · Entusiasta"},{"text":"Comprendo perfectamente que esta situación con su entrega retrasada le está causando muchos inconvenientes. Voy a escalar esto a nuestro equipo de envíos prioritarios ahora mismo... Ellos podrán acelerar su pedido y darle un tratamiento especial. ... Mientras genero el ticket de escalada, ¿podría confirmarme el mejor número de contacto para enviarle las actualizaciones? ... Y no se preocupe, también le ofreceremos una compensación por el retraso.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Entiendo que la aplicación móvil le sigue fallando. Vamos a intentar solucionarlo juntos. Primero, cierre la aplicación forzosamente deslizándola desde la pantalla de aplicaciones recientes. A continuación, vaya a los Ajustes de su teléfono, busque nuestra aplicación y borre tanto la caché como los datos. Después, reinicie el teléfono e intente abrir la aplicación de nuevo. Dígame cuando haya completado estos pasos.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Gracias por proporcionarme esos detalles sobre la discrepancia en la facturación. Déjeme revisar su extracto reciente. ... He revisado detenidamente el historial de su cuenta de enero a marzo, y puedo ver dónde se produjo el solapamiento. Le voy a desglosar los cargos y le explicaré cómo ajustaremos su próximo extracto para reflejar el importe correcto.","emotion":"Claro e instructivo (Conversacional) · Tranquilizador"},{"text":"Estoy consultando los detalles de su reserva ahora mismo. Veo que tiene reservada nuestra habitación deluxe con vistas al mar, con entrada el viernes, 15 de julio a las 3:00 PM y salida el lunes, 18 de julio a las 11:00 AM. El total de su estancia es de ciento setenta y cinco euros con cincuenta céntimos, lo que incluye el suplemento de fin de semana y las tasas del complejo. ¿Le gustaría que le enviara un desglose detallado de estos cargos?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Déjeme revisar los ajustes de su suscripción... Veo que su acceso premium está configurado para expirar la semana que viene. Para evitar interrupciones en el servicio, ¿le gustaría que le explicara el proceso de renovación? En este momento disponemos de un descuento especial por fidelidad para miembros de larga trayectoria como usted.","emotion":"Amigable y casual (Conversacional) · Neutral/profesional"},{"text":"Según el código de error de su dispositivo, parece que podría haber un conflicto con la configuración del cortafuegos de su sistema. Vamos a modificar estos ajustes para resolver el problema de conexión. Acceda a las Preferencias del Sistema, seleccione Seguridad y Privacidad y haga clic en la pestaña Cortafuegos. Le guiaré a través de los ajustes necesarios.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Entiendo que está teniendo problemas con las lecturas de temperatura de su termostato inteligente. En primer lugar, compruebe que el dispositivo está correctamente fijado a la pared y alejado de cualquier fuente de calor. A continuación, acceda a los ajustes del dispositivo a través de la aplicación móvil y seleccione «Recalibrar sensor» El proceso tarda unos 2 minutos en completarse.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que se ha realizado un cargo no autorizado en su cuenta... Voy a ayudarle con esto de inmediato. Estoy bloqueando temporalmente su tarjeta para evitar que se produzcan más transacciones no autorizadas... Ahora, voy a ponerle en contacto con nuestro equipo de prevención de fraude, que le ayudará a impugnar este cargo y a proteger su cuenta.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Su reserva de vuelo ha sido modificada con éxito. La nueva hora de salida es las 2:15 PM del martes, 12 de marzo, desde la Terminal B, Puerta 23. La tarifa por cambio ha sido eximida debido al aviso meteorológico. ¿Le gustaría que le enviara su tarjeta de embarque actualizada a su correo electrónico?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Bienvenido de nuevo. Veo que es la primera vez que inicia sesión desde que actualizamos nuestra interfaz de banca móvil... ¿Le gustaría un recorrido rápido por las nuevas funciones? Puedo mostrarle dónde encontrar su historial de transacciones, cómo configurar pagos recurrentes y cómo acceder a nuestras nuevas herramientas de presupuesto.","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para resolver el problema de sincronización entre su pulsera de actividad y su smartphone, asegúrese de que el Bluetooth esté activado en ambos dispositivos. A continuación, abra la aplicación de fitness, pulse el icono del menú en la esquina superior derecha, seleccione 'Dispositivos' y elija 'Restablecer conexión'. Después, siga las instrucciones de emparejamiento que aparecen en pantalla.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"He revisado su reclamación de garantía por el teclado defectuoso... Voy a escalarla al equipo de especialistas en productos... Necesitarán realizar una evaluación detallada de los problemas notificados. Mientras creo el caso, ¿podría confirmarme cuándo notó por primera vez que las teclas se quedaban atascadas? Esto ayudará a agilizar el proceso de evaluación.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Su consulta virtual con el Dr. Thompson ha quedado confirmada para el jueves, 8 de septiembre a las 10:30 AM, hora del Este. La sesión durará aproximadamente 45 minutos. Por favor, conéctese 5 minutos antes para comprobar su conexión. ¿Desea que le envíe las instrucciones de preparación?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Vamos a solucionar los problemas de conexión de su impresora. En primer lugar, reinicie tanto la impresora como el ordenador. Una vez que ambos estén encendidos, compruebe si la impresora aparece en su lista de dispositivos. Si no es así, intente eliminarla y volver a añadirla utilizando la dirección IP que se muestra en la pantalla de la impresora.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Según el informe de diagnóstico de su vehículo, el testigo del motor se activó debido a un sensor de oxígeno defectuoso. Le recomiendo que programe una cita de servicio para reemplazar esta pieza. La reparación suele tardar aproximadamente 2 horas y está cubierta por su garantía extendida.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"He estado analizando sus patrones de consumo energético. Su sistema domótico muestra un aumento del 40 % en el uso entre las 14:00 y las 16:00 horas a diario. ¿Le gustaría que le ayudara a configurar ajustes automáticos de temperatura para optimizar su eficiencia energética?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar el control parental en su cuenta de streaming, primero inicie sesión en la configuración de su perfil. Seleccione 'Gestión de cuenta' y, a continuación, 'Restricciones de visualización'. Podrá establecer filtros de contenido adecuados a cada edad y crear un PIN que se solicitará para acceder a cualquier contenido restringido.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que sus últimos tres pagos han sido rechazados... Déjeme revisar con más detalle el método de pago que tiene registrado... Aquí está el problema: su tarjeta de crédito ha caducado. ¿Le gustaría actualizar su información de pago ahora? Puedo guiarle a través del proceso para evitar cualquier interrupción en el servicio.","emotion":"Claro e instructivo (Conversacional) · Neutral/profesional"},{"text":"Su reclamación de seguro por los daños causados por el agua ha sido recibida y asignada a la gestora de siniestros Sarah Martinez. Ella se pondrá en contacto con usted en las próximas 24 horas para programar una inspección de la propiedad. El número de siniestro es WD-2024-789456. ¿Desea que le envíe estos datos a su correo electrónico?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Vaya... Veo que su paquete ha sufrido un retraso en la aduana... Déjeme escalarlo a nuestro departamento de envíos internacionales... Ellos tienen contacto directo con los agentes de aduanas y pueden ayudar a agilizar el proceso de despacho. Mientras creo el caso, ¿podría confirmarme si el paquete contiene algún artículo restringido?","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Para resolver el mensaje de error que aparece en su programa de declaración de impuestos, tendremos que borrar los datos en caché y verificar la información de su W-2. Haga clic en «Herramientas» en el menú superior, seleccione «Borrar y empezar de nuevo» y, a continuación, vuelva a introducir su información laboral cuando se le solicite.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"El sistema de monitorización de sus paneles solares está mostrando una eficiencia reducida en el conjunto orientado al sur. Le recomiendo programar una revisión de mantenimiento para comprobar si hay suciedad o daños. La cita más próxima disponible es el próximo martes a las 9:00 de la mañana. ¿Le reservo ese horario?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Revisando los datos de su controlador de riego inteligente... Parece que los sensores de la Zona 2 están registrando niveles de humedad inusualmente elevados... Esto podría indicar una fuga en el sistema. ¿Desea que le ponga en contacto con nuestro servicio de fontanería de urgencias para evitar posibles daños en su propiedad?","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Para vincular su nuevo reloj inteligente con la aplicación de monitorización de salud, asegúrese de que el reloj esté cargado y dentro del alcance de su teléfono. Abra la aplicación, pulse «Añadir dispositivo» y acerque el reloj al teléfono hasta que vea aparecer el código de emparejamiento en ambas pantallas.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que está interesado en nuestro curso avanzado de fotografía... La próxima edición comienza el 3 de octubre y tiene una duración de 12 semanas, con clases virtuales todos los martes a las 7 PM, hora del Este. El curso incluye trabajos prácticos, comentarios de profesionales y acceso a nuestra biblioteca de recursos en línea. ¿Le gustaría conocer las opciones de inscripción?","emotion":"Claro e instructivo · Entusiasta"},{"text":"Permítame revisar el rendimiento de su cartera de inversiones... He observado algunas tendencias interesantes en sus activos del sector tecnológico... Han registrado un aumento del 12% durante el último trimestre. ¿Le gustaría que le explicara cómo estas ganancias podrían afectar a sus objetivos de planificación para la jubilación?","emotion":"Amigable y casual (Conversacional) · Neutral/profesional"},{"text":"Para configurar su nuevo sistema de seguridad del hogar, empezaremos por el panel de control principal. Mantenga pulsado el botón de Inicio durante 3 segundos hasta escuchar un pitido. Introduzca su código maestro de 4 dígitos y seleccione «Configuración del sistema» en el menú. Le guiaré a través de cada ajuste.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"El reconocimiento anual de bienestar de su mascota ha sido programado con el Dr. Garcia para el lunes, 15 de abril a las 2:30 PM. Por favor, llegue 10 minutos antes para actualizar su información de contacto. Recuerde traer la lista de medicamentos actuales de su mascota y cualquier duda sobre su alimentación que desee comentar.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Vaya... Veo que ha habido un problema con su entrega de la compra reciente... Varios artículos llegaron en mal estado... Le pedimos sinceras disculpas por este contratiempo. Permítame ponerle en contacto con nuestro equipo de control de calidad... Tramitarán un reembolso inmediato y se asegurarán de que esto no vuelva a ocurrir.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Para trasladar sus servicios de suministros a su nueva dirección, tendremos que tramitar una orden de baja del servicio en 742 Maple Street con efectividad el 1 de julio, e iniciar el servicio en 1235 Oak Avenue a partir del 2 de julio. La tarifa de traslado de quince euros se aplicará en su factura final en la dirección actual.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"He estado revisando su progreso en el aprendizaje de idiomas. Ha completado el 85% del curso de español de nivel intermedio y ha mantenido una racha de práctica de 15 días. ¿Le gustaría explorar nuestros módulos de conversación para seguir mejorando sus habilidades?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para resolver el problema de carga de su vehículo eléctrico, compruebe primero que el cable de carga esté bien insertado en ambos extremos. El indicador luminoso debería estar en verde fijo. Si parpadea en rojo, desconecte el cable, espere 30 segundos y vuelva a conectarlo. Esto reinicia la sesión de carga.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su inscripción al evento virtual 'Digital Marketing Trends 2024' está confirmada. El seminario web comienza a las 11:00 AM GMT el miércoles, 8 de mayo. Recibirá un enlace de acceso único 24 horas antes del evento. ¿Desea que lo añada a su calendario?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Veo que está teniendo problemas con la función de reconocimiento de voz... Déjeme revisar los registros del sistema... parece que puede haber algo de ruido de fondo que está afectando la precisión. ¿Le ajustamos la configuración de sensibilidad, o prefiere hablar con nuestro especialista en accesibilidad?","emotion":"Claro e instructivo (Conversacional) · Tranquilizador"},{"text":"Su programa de ejercicio ha sido actualizado en función de su progreso reciente. He ajustado la intensidad de sus entrenamientos para adaptarlos a su rehabilitación de rodilla. La nueva rutina incluye ejercicios de cardio de bajo impacto y entrenamiento de fuerza modificado. ¿Quiere que le explique los cambios?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los diagnósticos de su frigorífico inteligente... La temperatura del compartimento principal ha estado oscilando entre los 3 y los 7 grados... Esto podría indicar un fallo en el sensor. Voy a ponerle en contacto con nuestro equipo de reparación de electrodomésticos para evitar que se estropeen los alimentos.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Para acceder a sus entradas digitales para el concierto, abra la aplicación del recinto y pulse en 'Mis eventos'. Sus entradas para la actuación de la Orquesta Sinfónica en el Auditorio Nacional el sábado, 22 de junio a las 8:00 PM aparecerán con un código QR. Puede añadirlas a la cartera de su móvil para acceder más fácilmente.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que ha alcanzado el límite de almacenamiento en la nube... Déjeme analizar sus patrones de uso... Qué interesante: parece que tiene varios álbumes de fotos duplicados que están ocupando espacio. ¿Le ayudo a identificar y eliminar estos duplicados para liberar almacenamiento?","emotion":"Amigable y casual (Conversacional) · Neutral/profesional"},{"text":"Su reserva en el restaurante para 6 personas ha sido confirmada en Bella Cucina para el viernes, 9 de agosto a las 7:30 PM. He anotado su solicitud de una mesa tranquila y la alergia al marisco en su grupo. El restaurante le llamará para confirmar cualquier adaptación dietética específica.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Para configurar la función de geocerca de su nuevo termostato inteligente, necesitaremos establecer la ubicación de su hogar y el radio de activación. Abra los ajustes de la aplicación, pulse en 'Servicios de ubicación' y configure su dirección. A continuación, ajuste el control deslizante del radio para determinar cuándo debe activarse el sistema.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que ha habido un error con la autorización de renovación de su receta... Voy a escalar esto a nuestro equipo de farmacia de inmediato... Necesitarán ponerse en contacto con su médico para resolverlo. Mientras tanto, le quedan tres días de medicación, ¿es correcto?","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Su reclamación al seguro de viaje por el vuelo cancelado ha sido aprobada. El reembolso de ciento setenta y cinco euros con cuarenta y tres céntimos se realizará en su método de pago original en un plazo de 5 a 7 días laborables. Esto cubre el coste del vuelo y los gastos de transporte al aeropuerto.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"He estado revisando los datos de producción de sus paneles solares. Su sistema ha generado un 25% más de energía este mes en comparación con el año pasado. ¿Le gustaría ver un desglose detallado de su ahorro energético y su impacto medioambiental?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para resolver el problema de sincronización con su cerradura inteligente, primero retire las pilas durante 30 segundos. Mientras no estén, mantenga pulsado el botón de Programación. Vuelva a insertar las pilas y, cuando escuche tres pitidos, suelte el botón. Esto restablecerá la conexión con su concentrador.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que le interesa comenzar a practicar la meditación... Permítame contarle nuestro programa de atención plena guiada. Ofrecemos sesiones diarias de 10 minutos, ejercicios de respiración personalizados y seguimiento de su progreso. ¿Le gustaría probar una meditación de muestra para ver si es lo que busca?","emotion":"Amigable y casual (Conversacional) · Neutral/profesional"},{"text":"Para configurar su cámara de seguridad inalámbrica, conéctela a la corriente y espere a que el LED parpadee en azul. A continuación, abra la aplicación de seguridad del hogar y seleccione 'Añadir dispositivo'. Cuando se lo indique, escanee el código QR situado en la parte inferior de la cámara para comenzar el proceso de configuración.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Estoy revisando los registros de error de su última subida de vídeo... Parece que el formato del archivo no es compatible con nuestra plataforma. Voy a ponerle en contacto con nuestro equipo de especialistas en medios... Ellos podrán ayudarle a convertir el contenido sin perder la calidad original.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"La inspección anual de la garantía de su hogar ha quedado programada para el martes, 5 de noviembre a las 10:00 AM. El técnico revisará todos los sistemas y electrodomésticos principales. Por favor, asegúrese de que haya acceso a sus unidades de climatización, al calentador de agua y al cuadro eléctrico.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Déjeme revisar su actividad de inversión reciente... Veo que ha activado la reinversión automática de dividendos... En función del rendimiento de su cartera, esto ha generado un retorno adicional del 3,2% este trimestre. ¿Le gustaría revisar las proyecciones de crecimiento compuesto?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para resolver los problemas de conectividad de red con su televisor inteligente, empecemos comprobando la intensidad de la señal WiFi. Vaya a Configuración, seleccione Estado de red y anote el indicador de señal. Si muestra menos de tres barras, tendremos que solucionar la ubicación de su router.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Estoy revisando su itinerario de vuelo... Hay un cambio de horario que afecta a su conexión en Madrid... Permítame transferirle a nuestro equipo de especialistas en viajes. Ellos pueden ayudarle a ajustar su reserva para asegurarse de que no pierda su vuelo de conexión a Edinburgh.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Sus preferencias de la caja de suscripción han sido actualizadas. A partir de su próxima entrega el 25 de marzo, incluiremos más opciones de origen vegetal y excluiremos todos los frutos secos según sus requisitos dietéticos. El total sigue siendo quince euros con noventa y nueve céntimos al mes.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Para optimizar el rendimiento de su portátil, tendremos que actualizar los controladores de su tarjeta gráfica. Abra el Administrador de dispositivos, despliegue Adaptadores de pantalla, haga clic con el botón derecho en su tarjeta gráfica y seleccione 'Actualizar controlador.' Elija 'Buscar automáticamente' cuando se le solicite.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Déjeme revisar su panel de análisis empresarial... Hay tendencias muy interesantes aquí... La participación de sus clientes ha aumentado un 45% desde que se implementó la nueva función de chat. ¿Le gustaría explorar opciones de automatización adicionales para mejorar aún más los tiempos de respuesta?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Su cita de telesalud ha sido confirmada para el miércoles, 10 de julio a las 15:15. La sala de espera virtual se abrirá 10 minutos antes de su hora programada. Por favor, pruebe su cámara y micrófono antes de unirse a la sesión.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando los datos de riego de su jardín inteligente... Los sensores de humedad indican una distribución irregular del agua en las zonas 3 y 4. Permítame ponerle en contacto con nuestro especialista en jardinería para evaluar si los aspersores necesitan algún ajuste.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestras nuevas herramientas de planificación de jubilación... Hemos integrado datos de mercado en tiempo real y evaluaciones de riesgo personalizadas. El sistema ahora puede generar estrategias de inversión a medida según su horizonte de jubilación. ¿Le gustaría explorar estas funcionalidades?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar los controles parentales en su consola de videojuegos, primero cree perfiles separados para cada miembro de la familia. Luego acceda a la sección de Gestión Familiar en Ajustes, seleccione 'Límites de Tiempo de Pantalla' y personalice el horario de juego para cada perfil.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Los resultados de la auditoría energética de su hogar están listos. El informe muestra un ahorro potencial de ciento veinte euros al año gracias a una mejor aislación y la instalación de iluminación LED. ¿Le gustaría que programara una consulta con nuestro especialista en eficiencia energética?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el certificado de seguridad de su sitio web... Parece que el certificado SSL está próximo a vencer... Permítame transferirle a nuestro equipo de ciberseguridad para garantizar un acceso seguro e ininterrumpido para sus clientes.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Revisando sus datos de seguimiento físico... Su resistencia cardiovascular ha mejorado de forma notable durante el último mes. El sistema sugiere ajustar sus zonas de entrenamiento para optimizar sus sesiones futuras. ¿Le gustaría revisar los cambios recomendados?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para solucionar el problema de conexión de su impresora inalámbrica, primero compruebe que tanto su ordenador como la impresora estén conectados a la misma red WiFi. Luego abra Configuración de Impresora, seleccione 'Eliminar Dispositivo' y siga los pasos para volver a añadir la impresora.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su pedido de lentes de contacto con graduación ha sido procesado. Según la cobertura de su seguro, el importe que abonará es de quince euros con setenta y cinco céntimos. Las lentes serán enviadas a su domicilio en un plazo de 5 a 7 días laborables.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Observo cierta actividad inusual en su informe de supervisión crediticia... Permítame transferirle al departamento de prevención de fraude... Le ayudarán a revisar las transacciones recientes e implementarán medidas de seguridad adicionales en su cuenta.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Su sesión de carga del vehículo eléctrico ha finalizado. La energía total cargada fue de 42,5 kWh, con un coste de doce euros con setenta y cinco céntimos. Esta sesión ha aumentado la autonomía de su vehículo en aproximadamente 160 millas. ¿Le gustaría consultar el historial de cargas de este mes?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando sus programaciones de domótica... Noto posibles conflictos entre la configuración de su climatización y sus persianas automatizadas que podrían afectar a la eficiencia energética. Permítame ponerle en contacto con nuestro especialista en domótica para optimizar estos ajustes.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestra nueva función de planificación de comidas... Analiza sus preferencias alimentarias y objetivos nutricionales para crear menús semanales personalizados. El sistema incluso puede generar listas de la compra y sugerir proveedores de ingredientes cercanos. ¿Le gustaría ver cómo funciona?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para calibrar su nueva báscula de cocina digital, colóquela sobre una superficie plana y pulse el botón de encendido. Cuando la pantalla muestre cero, mantenga pulsado el botón de calibración hasta que aparezca 'CAL.' Coloque la pesa incluida en el centro y espere el pitido de confirmación.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Sus documentos fiscales anuales han sido procesados y están listos para su revisión. El sistema ha identificado posibles deducciones en los gastos de su oficina en casa y en sus donaciones benéficas. ¿Le gustaría que programara una consulta con nuestro asesor fiscal?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy consultando los diagnósticos de su vehículo conectado... El sistema de monitorización de presión de neumáticos está indicando baja presión en el neumático trasero derecho. Permítame transferirle a nuestro equipo de asistencia en carretera para localizar el centro de servicio más cercano.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Basándome en su historial de reproducciones reciente, he observado que disfruta de los documentales sobre conservación del medio ambiente. ¿Le gustaría explorar nuestra colección seleccionada de documentales de naturaleza galardonados? También puedo mostrarle los próximos estrenos de esta categoría.","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nuevo sistema WiFi en malla, comience con el nodo router principal. Conéctelo a su módem utilizando el cable ethernet incluido y enciéndalo. Una vez que el LED se ponga azul fijo, abra la aplicación para empezar a añadir los nodos satélite.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su suscripción a nuestro plan de almacenamiento en la nube premium ha sido actualizada. El nuevo límite de almacenamiento es de 2 TB, con efecto inmediato. El cargo prorrateado de un euro con cincuenta céntimos aparecerá en su próxima factura. Sus archivos se están migrando en este momento al nuevo nivel de almacenamiento.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando las lecturas de su contador de agua inteligente... Hay un pico inusual en el consumo entre las 2 y las 4 de la madrugada. Esto podría indicar una fuga. Permítame ponerle en contacto con nuestro equipo de fontanería de urgencias para investigar el problema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Su sistema de seguridad del hogar detectó movimiento en la Zona 2 a las 3:45 de la tarde. Tras revisar las imágenes, parece ser un repartidor dejando un paquete. El vídeo se ha guardado en su almacenamiento en la nube. ¿Le explico cómo acceder a él?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los datos de su lavadora inteligente... Muestra una vibración excesiva durante los ciclos de centrifugado. Permítame ponerle en contacto con nuestro técnico de electrodomésticos para diagnosticar si hay algún problema de desequilibrio que requiera atención.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Déjeme contarle sobre nuestro nuevo panel de finanzas personales... Hemos añadido análisis de gastos con inteligencia artificial y categorías de presupuesto personalizables. El sistema ahora puede predecir gastos futuros basándose en sus patrones históricos. ¿Le gustaría que le hiciera una pequeña demostración?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para optimizar la duración de la batería de su smartphone, vaya a Ajustes, luego a Batería y pulse en Estado de la batería. Revise las aplicaciones que más energía consumen y ajuste su configuración de actualización en segundo plano. Esto puede prolongar considerablemente el rendimiento diario de su batería.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su kit de cata de vinos virtual ha sido enviado. El paquete contiene cuatro vinos premium y tarjetas con notas de cata. La sesión en línea está programada para el viernes, 20 de septiembre a las 7:00 PM BST. Recuerde enfriar los vinos blancos tres horas antes del evento.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando la configuración de su videoportero inteligente... La función de visión nocturna no está funcionando correctamente. Permítame ponerle en contacto con nuestro especialista en seguridad para garantizar una cobertura óptima de la zona de entrada.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Basándome en su historial reciente de escucha de pódcasts, me he dado cuenta de que disfruta de las investigaciones de crimen real. ¿Le gustaría explorar nuestra colección seleccionada de series de periodismo de investigación? También tenemos contenido extra exclusivo de sus presentadores favoritos.","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar la autenticación de doble factor en su cuenta, primero descargue nuestra aplicación de autenticación. Abra la aplicación, pulse en 'Añadir cuenta' y escanee el código QR que aparece en su pantalla. Esto añade una capa adicional de seguridad a su proceso de inicio de sesión.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"El registro del microchip de su mascota se ha actualizado con su nueva información de contacto. El cambio se verá reflejado en todas las bases de datos nacionales de mascotas en un plazo de 24 horas. ¿Le gustaría que le enviara una confirmación de estas actualizaciones?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el programa de su sistema de riego inteligente... Dadas las últimas cifras de lluvia registradas, deberíamos ajustar sus patrones de riego. Permítame ponerle en contacto con nuestro especialista en irrigación para optimizar su configuración de ahorro de agua.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestra nueva función de intercambio de idiomas... Nos hemos asociado con hablantes nativos de todo el mundo para practicar conversaciones en tiempo real. El sistema le empareja según su nivel de competencia y sus intereses. ¿Le gustaría probar una sesión de muestra?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar la función de preparación automática de su cafetera inteligente, abra la aplicación y seleccione 'Programar'. Establezca su hora y la intensidad de preparación preferidas. Luego elija su receta predefinida favorita o cree un perfil de preparación personalizado.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"El reequilibrio de su cartera de inversiones está completo. Los ajustes se alinean con su perfil de tolerancia al riesgo actualizado. Los cambios han implicado vender el 10% de sus bonos y aumentar su exposición a los mercados internacionales.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando los datos de calidad del aire de su hogar... Los niveles de partículas en suspensión han superado los umbrales recomendados. Permítame ponerle en contacto con nuestro especialista en medio ambiente para hablar sobre soluciones de purificación del aire.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Revisando los datos de su reloj inteligente... Sus patrones de sueño muestran una mejora en la duración del sueño profundo desde que empezó a utilizar la función de rutina nocturna. ¿Le gustaría explorar información adicional sobre su bienestar basada en la variabilidad de su frecuencia cardíaca?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar la función de mapeo de su nuevo robot aspirador, asegúrese de que todas las puertas estén abiertas en las áreas que desea limpiar. Inicie un recorrido de mapeo pulsando dos veces el botón de inicio y, a continuación, deje que el dispositivo complete la exploración de su espacio.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su suscripción a nuestro servicio de entrega de comidas ha sido actualizada. En función de sus comentarios, hemos ajustado el tamaño de las porciones e incluido más opciones vegetarianas. Estos cambios entrarán en vigor con su próximo pedido del martes.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el informe de diagnóstico de su coche conectado... La presión del fluido de transmisión está por debajo de los niveles óptimos. Permítame ponerle en contacto con nuestro mecánico certificado para programar una revisión de mantenimiento preventivo.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle algo sobre nuestras nuevas clases de fitness en realidad virtual... Hemos creado entornos de entrenamiento inmersivos con seguimiento del rendimiento en tiempo real. El sistema adapta la intensidad en función de su frecuencia cardíaca y sus objetivos de forma física. ¿Le gustaría probar una sesión de demostración?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar las funciones de monitorización de salud de su espejo inteligente, póngase a unos 60 centímetros de distancia y siga las instrucciones de calibración que aparecen en pantalla. El sistema medirá sus constantes vitales y creará su perfil de salud de referencia para futuras consultas.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su obra de arte digital ha sido acuñada como un NFT. El identificador de transacción y el certificado de propiedad están siendo generados. Recibirá la confirmación del registro en la cadena de bloques en los próximos 30 minutos.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando las variaciones de temperatura de su horno inteligente... Las lecturas recientes muestran patrones de calentamiento irregulares. Permítame ponerle en contacto con nuestro especialista en electrodomésticos para garantizar una calibración adecuada y un funcionamiento seguro.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según los datos de su aplicación de jardinería, sus plantas de tomate muestran signos de un crecimiento óptimo. ¿Le gustaría explorar nuestros consejos avanzados de cultivo para maximizar la producción? También contamos con nuevas funciones para el seguimiento de los niveles de nutrientes.","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar la función de pago sin contacto de su nueva cartera inteligente, abra la configuración de seguridad y verifique su identidad. A continuación, añada sus tarjetas de pago escaneándolas con la cámara de su teléfono.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su consulta virtual de interiorismo ha quedado programada para el lunes a las 2:00 PM. Por favor, tome fotos de las habitaciones sobre las que desee hablar y cárguelas en su carpeta de proyecto antes de la sesión.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el inventario de su frigorífico inteligente... Varios productos están próximos a su fecha de caducidad. Permítame ponerle en contacto con nuestro especialista en planificación de menús para ayudarle a optimizar la gestión de su despensa.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle nuestra nueva función de compras con realidad aumentada... Puede probarse ropa de forma virtual y ver cómo quedaría el mobiliario en su espacio. El sistema utiliza medidas precisas para una visualización exacta. ¿Le gustaría una demostración?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar sus persianas inteligentes, asegúrese primero de que estén correctamente vinculadas con su concentrador doméstico. Después, acceda al menú de automatización para establecer horarios según los niveles de luz solar y la temperatura de la habitación.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su escaneo de seguridad biométrica ha finalizado. El sistema ha actualizado sus credenciales de acceso en todos los dispositivos conectados. Estos cambios entrarán en vigor en los próximos 15 minutos.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando su sistema de batería doméstica... La eficiencia de carga ha disminuido un 15%. Permítame ponerle en contacto con nuestro especialista en energía para optimizar el almacenamiento y el consumo de electricidad.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Al revisar sus datos de bienestar digital... Sus ejercicios de gestión del estrés han mostrado resultados positivos. ¿Le gustaría explorar nuestros programas avanzados de mindfulness adaptados a su rutina diaria?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar el seguimiento nutricional de su báscula de cocina inteligente, primero conéctela a su aplicación de planificación de comidas. A continuación, calibre la superficie y actualice sus preferencias dietéticas para obtener cálculos precisos de macronutrientes.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su sesión de meditación está programada para mañana a las 9:00. El sistema le guiará a través de un recorrido de relajación personalizado basado en sus niveles de estrés y sus patrones de sueño.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los registros de acceso de su cerradura inteligente... Se han producido varios intentos fallidos de entrada. Permítame ponerle en contacto con nuestro equipo de seguridad para revisar la actividad reciente y reforzar los protocolos de seguridad de su puerta.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según sus preferencias de entretenimiento en casa, he observado que disfruta de los juegos de narración interactiva. ¿Le gustaría explorar nuestra nueva colección de aventuras narrativas con tramas adaptativas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para optimizar el rendimiento de su purificador de aire inteligente, colóquelo a al menos un metro de paredes y muebles. Después, acceda a la pantalla de monitorización de la calidad del aire para configurar horarios de filtración personalizados.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su póliza de seguro digital se ha actualizado con las nuevas opciones de cobertura que ha elegido. Los cambios incluyen una mayor protección cibernética y cobertura para dispositivos inteligentes. La nueva prima quedará reflejada en el extracto del próximo mes.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando los datos de eficiencia de sus paneles solares... Los patrones de sombreado recientes indican que podría ser necesario ajustar la inclinación de los paneles. Permítame ponerle en contacto con nuestro especialista en optimización solar para maximizar su producción de energía.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestro nuevo organizador inteligente de armario... Registra sus patrones de uso de ropa y le sugiere combinaciones de conjuntos según el tiempo y la ocasión. ¿Le gustaría ver cómo puede simplificarle la rutina matutina?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nuevo sistema de ducha inteligente, primero calibre los sensores de temperatura del agua. A continuación, cree perfiles para cada miembro de la familia con sus preferencias de temperatura y presión del agua.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Los resultados de su análisis genético de salud han sido procesados. El informe seguro está disponible en su portal de paciente. Nuestro consejero genético ha revisado los resultados e incluido recomendaciones de salud personalizadas.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los datos de calidad del sueño de su cama inteligente... Los sensores de presión indican un posible desgaste del colchón. Permítame ponerle en contacto con nuestro especialista en sueño para hablar sobre las opciones de optimización del confort.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según la actividad reciente de su hogar inteligente, me he dado cuenta de que ajusta la iluminación con frecuencia por las tardes. ¿Le gustaría explorar nuestros nuevos ajustes preestablecidos de iluminación por ritmo circadiano? Se adaptan automáticamente para favorecer su ciclo natural de sueño.","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nuevo sistema de cine en casa controlado por voz, coloque los altavoces siguiendo el diagrama de la sala. A continuación, ejecute la prueba de calibración de audio para optimizar el sonido según la acústica de su habitación.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su plan de comidas personalizado ha sido actualizado en función de sus últimos objetivos nutricionales. El nuevo plan incluye más proteínas de origen vegetal y alimentos ricos en omega-3. Su lista de la compra se generará en consecuencia.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando el registro de mantenimiento de su cinta de correr inteligente... Las lecturas de la tensión de la cinta están fuera del rango óptimo. Permítame ponerle en contacto con nuestro especialista en equipamiento deportivo para garantizar entrenamientos seguros y eficaces.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestras nuevas herramientas de creación de arte digital... Hemos añadido pinceles asistidos por inteligencia artificial y paletas de colores dinámicas. El sistema aprende de su estilo artístico para sugerirle técnicas complementarias. ¿Le gustaría una demostración?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar el seguimiento de fitness de su espejo inteligente, colóquese en el área marcada y realice una breve calibración de movimiento. El sistema registrará entonces su postura y progreso durante los entrenamientos en casa.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su cita para la auditoría energética del hogar ha quedado confirmada para el próximo jueves a las 10:00. El técnico evaluará el aislamiento, la eficiencia del aire acondicionado y las posibles zonas para la instalación de paneles solares.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando la actividad de su puerta de garaje inteligente... Se ha detectado un patrón inusual de aperturas parciales. Permítame ponerle en contacto con nuestro técnico de seguridad para revisar el motor y la alineación de los sensores.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según sus preferencias culinarias, he observado que disfruta experimentando con cocinas internacionales. ¿Le gustaría explorar nuestra nueva colección de recetas inteligentes con guías en vídeo paso a paso y opciones de sustitución de ingredientes?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nueva bodega inteligente, primero calibre los sensores de temperatura y humedad. A continuación, cree zonas para los distintos tipos de vino y establezca las condiciones de almacenamiento óptimas para cada uno.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su sesión de entrenamiento personal virtual ha sido programada para el miércoles a las 15:00. El sistema monitorizará su frecuencia cardíaca y sus patrones de movimiento para ofrecerle correcciones de postura en tiempo real.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando el rendimiento de su calentador de agua inteligente... Los elementos calefactores muestran un consumo eléctrico irregular. Permítame ponerle en contacto con nuestro especialista en eficiencia energética para optimizar el sistema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Revisando sus hábitos de lectura digital... Ha mostrado interés por la ficción histórica con temática científica. ¿Le gustaría explorar nuestra selección de obras similares con líneas de tiempo históricas interactivas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar el reconocimiento facial de su nuevo videoportero inteligente, añada fotos de su familia a la galería de usuarios autorizados. A continuación, ajuste la sensibilidad de detección según las condiciones de iluminación de su entrada.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su estrategia de inversión automatizada ha sido actualizada en función de las tendencias recientes del mercado. Los ajustes de la cartera se centran en sectores tecnológicos emergentes, manteniendo al mismo tiempo sus parámetros de tolerancia al riesgo.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los datos de su gimnasio doméstico conectado... Parece que la calibración de resistencia de su sistema de pesas inteligente está desviándose. Permítame ponerle en contacto con nuestro especialista en equipamiento deportivo para garantizar un seguimiento preciso de sus entrenamientos.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestro nuevo asistente de recetas por voz... Puede guiarle paso a paso mientras cocina sin necesidad de tocar nada, y ajusta automáticamente las cantidades de los ingredientes según el número de raciones. ¿Le gustaría probarlo con una de sus recetas favoritas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar el modo automático de su humidificador inteligente, coloque primero el sensor de humedad en el lugar que prefiera. Después, establezca su rango de humedad deseado y programe el horario en el menú de ajustes de confort de la aplicación.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su suscripción a nuestra red de pódcasts premium ha sido renovada. La cuota anual de diecinueve euros con noventa y nueve céntimos ha sido procesada, y su acceso a los contenidos exclusivos ha sido ampliado hasta diciembre 2024.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando las lecturas de su vigilabebés inteligente... La temperatura de la habitación ha fluctuado fuera del rango óptimo en varias ocasiones esta noche. Permítame ponerle en contacto con nuestro especialista en cuidado infantil para hablar sobre el control del entorno.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"A partir de sus sesiones de práctica musical recientes, veo que está progresando de manera excelente con las clases de piano virtual. ¿Le gustaría explorar nuestros módulos avanzados de entrenamiento rítmico y ejercicios de armonía?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para optimizar la configuración ergonómica de su escritorio inteligente, primero ajuste la altura mientras está de pie con la espalda recta. A continuación, establezca tres posiciones predefinidas: de pie, sentado y escribiendo. El sistema le recordará que cambie de postura a lo largo del día.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su sesión de organización de armario virtual ha sido programada para el viernes a las 11:00 de la mañana. Nuestra consultora de estilo le ayudará a clasificar su guardarropa y a crear colecciones cápsula por temporada.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los datos de su descalcificador de agua inteligente... Los ciclos de regeneración están ocurriendo con más frecuencia de lo esperado. Permítame ponerle en contacto con nuestro especialista en tratamiento de agua para optimizar la eficiencia del sistema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestra nueva inteligencia artificial de pronunciación de idiomas... Ofrece retroalimentación en tiempo real sobre el acento y la entonación mediante reconocimiento de voz avanzado. ¿Le gustaría probar una lección de muestra en su idioma de El Corte Inglés?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar el control de porciones de su dispensador de comida inteligente para mascotas, primero calibre el dispensador según el tipo de alimento de su mascota. Después, programe hasta seis horarios de comida con cantidades personalizadas para cada toma.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su póliza de seguro del hogar ha sido actualizada para incluir cobertura para dispositivos domésticos inteligentes. La nueva prima refleja un descuento del 5% por las funciones de seguridad instaladas. Estos cambios entran en vigor el próximo mes.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando su sistema de purificación de aire interior... La eficiencia del filtro HEPA ha caído por debajo del 90%. Permítame ponerle en contacto con nuestro especialista en calidad del aire para programar una revisión de mantenimiento.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según sus sesiones de fitness en realidad virtual, ha alcanzado un nuevo récord personal en resistencia cardiovascular. ¿Le gustaría explorar nuestros programas de entrenamiento avanzados diseñados para su nivel de forma física?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su dispensador inteligente de medicamentos, primero clasifique sus medicamentos en los compartimentos etiquetados. A continuación, programe el horario de dispensación según las instrucciones de su receta.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su cita virtual para la preparación de la declaración de la renta ha sido confirmada para el martes a la 1:00 PM. Por favor, asegúrese de subir todos los documentos necesarios a su portal seguro antes de la sesión.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando las zonas de detección de movimiento de su timbre inteligente... Hay una superposición considerable que está generando alertas duplicadas. Permítame ponerle en contacto con nuestro especialista en seguridad para optimizar las áreas de cobertura.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestra nueva herramienta inteligente de planificación de jardín... Crea calendarios de siembra personalizados según el clima local y las condiciones del suelo. ¿Le gustaría empezar a planificar su jardín de primavera?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar la función de tintado automático de su ventana inteligente, primero calibre los sensores de luz. Después, ajuste los niveles de opacidad que prefiera para cada momento del día en el menú de automatización.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su paquete de clases virtuales de guitarra ha sido procesado. Tendrá acceso a 12 sesiones semanales, materiales de práctica y comentarios personalizados de nuestros instructores. La primera clase está programada para el lunes a las 4:00 PM.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando su sistema inteligente de piscina... Los niveles de pH han estado fluctuando fuera del rango ideal.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Basándome en sus preferencias de entretenimiento en el hogar inteligente, he notado que disfruta de la iluminación ambiental mientras escucha música. ¿Le gustaría explorar nuestras nuevas funciones de espectáculos de luz sincronizados para sus listas de reproducción favoritas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nuevo arenero inteligente para gatos, colóquelo en un lugar tranquilo y conéctelo a la corriente. A continuación, use la aplicación para programar los ciclos de limpieza y recibir alertas de mantenimiento.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su cata de vinos virtual ha quedado programada para el sábado a las 6:00 de la tarde. Los vinos seleccionados se entregarán mañana y las notas de cata estarán disponibles en su portal del evento.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando las zonas de riego inteligente... Los sensores de humedad del suelo en el huerto indican una posible saturación de las raíces.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestros nuevos entornos de meditación en realidad virtual... Hemos añadido escenas inmersivas de la naturaleza con audio binaural para una relajación más profunda. ¿Le gustaría previsualizar las nuevas experiencias?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar las funciones de monitoreo de salud del espejo de baño inteligente, sitúese a la distancia indicada y complete el escáner de salud inicial. El sistema establecerá sus constantes vitales de referencia para el seguimiento diario.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su programación de domótica ha sido optimizada en función de sus patrones de uso. Las nuevas rutinas ajustarán automáticamente la iluminación, la temperatura y la configuración de seguridad a lo largo del día.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando el consumo energético de su frigorífico inteligente... Los picos recientes sugieren posibles problemas con el sello de la puerta. Permítame ponerle en contacto con nuestro especialista en electrodomésticos para evitar un mayor desperdicio de energía.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según sus objetivos de forma física y su horario, he notado que prefiere entrenar por las mañanas. ¿Le gustaría explorar nuestras nuevas sesiones de yoga al amanecer con iluminación dinámica y secuencias suaves de despertar?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar la función de asesor de moda de su espejo inteligente, primero complete su perfil de estilo. Después, haga fotos de cuerpo entero con diferentes conjuntos para ayudar al sistema a aprender sus preferencias.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su inscripción a la clase de cocina virtual ha sido confirmada. El kit de ingredientes llegará el viernes, y su primera clase con Chef Maria comienza el sábado a las 2:00 de la tarde.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el registro de mantenimiento de su aspiradora inteligente... El rodillo de cepillo muestra señales de menor eficiencia. Permítame conectarle con nuestro especialista en robótica para evitar posibles problemas de navegación.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestro nuevo sistema de optimización del sueño... Combina controles ambientales con monitorización de biorritmos para crear su entorno de descanso ideal. ¿Le gustaría explorar la configuración personalizada?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su sistema de iluminación exterior inteligente, primero defina las zonas de su jardín en la aplicación. Después, establezca la activación por movimiento y los umbrales de luz ambiental para cada área.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su exposición en la galería de arte virtual ha quedado programada para el mes que viene. La vista previa digital estará disponible la semana próxima, y las invitaciones se enviarán automáticamente a su lista de invitados.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando los datos de rendimiento de su lavadora inteligente... La eficiencia del centrifugado ha disminuido considerablemente. Permítame conectarle con nuestro especialista en electrodomésticos para diagnosticar posibles problemas de equilibrado.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según el uso de su cine en casa, veo que disfruta de experiencias de audio envolvente. ¿Le gustaría explorar nuestra nueva función de calibración de audio espacial para una posición óptima del sonido envolvente?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su nuevo sistema inteligente de monitorización de plantas, inserte los sensores en cada maceta a la profundidad indicada. A continuación, introduzca la especie de cada planta en la aplicación para recibir recomendaciones de cuidado personalizadas.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su sesión virtual de planificación financiera ha sido confirmada para el jueves a las 2:00 PM. Por favor, complete el cuestionario de evaluación de riesgos en su portal antes de la reunión.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando los niveles de batería de su cerradura inteligente... Muestran un consumo inusual. Permítame ponerle en contacto con nuestro especialista en seguridad para garantizar una gestión correcta de la alimentación.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestro nuevo sistema inteligente de cuidado de armario... Monitoriza los niveles de humedad y ofrece recomendaciones de cuidado específicas para cada tipo de tejido. ¿Le gustaría ver cómo puede prolongar la vida útil de su ropa?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar el modo de ahorro de agua de su ducha inteligente, primero calibre el sensor de caudal. Después, establezca su temperatura preferida y los límites de duración en el menú de configuración ecológica.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su consulta virtual de presentación del hogar ha sido reservada para el lunes a las 3:00 PM. Por favor, suba fotografías de cada habitación a su portal de cliente antes de la sesión.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando la precisión de temperatura de su horno inteligente... Las lecturas recientes indican una posible desviación del sensor. Permítame ponerle en contacto con nuestro especialista en electrodomésticos de cocina para una calibración precisa.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Según los patrones de seguridad de su hogar inteligente, noto que revisa las cámaras exteriores con frecuencia por la noche. ¿Le gustaría conocer nuestras nuevas funciones de detección de movimiento con inteligencia artificial para una vigilancia nocturna mejorada?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su sistema inteligente de conservación de vinos, primero calibre la sonda de temperatura. Luego, programe las condiciones óptimas de almacenamiento para cada variedad de vino de su colección.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su evaluación de bienestar virtual ha sido programada con el Dr. Sharma para el viernes a las 10:00 AM. El cuestionario previo a la cita ya está disponible en su portal de salud.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el control de zonas de su termostato inteligente... Hay una variación de temperatura considerable entre las habitaciones. Permítame ponerle en contacto con nuestro especialista en climatización para optimizar su sistema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestra nueva plataforma de creación de arte digital... Hemos añadido estilos de pincel con inteligencia artificial y sugerencias de armonía de color. ¿Le gustaría explorar estas herramientas creativas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar el control de voz de su hogar inteligente, complete primero el entrenamiento de reconocimiento de voz. Luego, cree comandos personalizados para las rutinas que use con más frecuencia.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su evaluación de fitness en realidad virtual ha sido procesada. Su programa de entrenamiento personalizado estará disponible mañana, con especial atención a sus objetivos de fortalecimiento de la zona central (core).","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando el sistema de ventilación de su garaje inteligente... Los sensores de calidad del aire detectan niveles elevados de monóxido de carbono. Permítame ponerle en contacto con nuestro especialista en seguridad de inmediato.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame contarle sobre nuestro nuevo sistema inteligente de aromatización del hogar... Puede crear perfiles de fragancia personalizados para distintas habitaciones y ocasiones. ¿Le gustaría explorar las opciones de programación de aromaterapia?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar los perfiles de iluminación de su nuevo espejo de maquillaje inteligente, primero calibre los sensores de temperatura de color. A continuación, cree escenas de iluminación personalizadas para diferentes momentos del día y estilos de maquillaje.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su suscripción de estilismo personal virtual ha sido activada. Su primera selección de armario curada estará disponible para previsualizar en su portal de estilo el próximo martes.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el rendimiento de su calentador de agua inteligente... Los elementos calefactores muestran un consumo eléctrico irregular. Permítame ponerle en contacto con nuestro especialista en eficiencia para optimizar el sistema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Basándonos en sus patrones de automatización del hogar, puede que le interese nuestra nueva función de coordinación de rutinas matutinas. ¿Le gustaría explorar cómo puede sincronizar sus dispositivos para comenzar el día de forma más fluida?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para configurar su sistema inteligente de inventario de despensa, primero escanee el código QR de cada estante. Después, añada sus productos usando el lector de códigos de barras para hacer un seguimiento de las fechas de caducidad y las listas de la compra.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Ha alcanzado un hito en su proyecto de diseño de interiores virtual. Los renders en 3D de la renovación de su salón ya están disponibles para revisar en el panel de su proyecto.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy analizando los sensores de sus ventanas inteligentes... Varias unidades están detectando deterioro en los sellados. Permítame ponerle en contacto con nuestro especialista en eficiencia energética para evitar pérdidas de calor.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Permítame hablarle de nuestro nuevo sistema de recomendación de recetas basado en inteligencia artificial... Aprende de sus preferencias culinarias y sus requisitos dietéticos para sugerirle planes de comidas personalizados. ¿Le gustaría explorar sus sugerencias personalizadas?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para activar la optimización acústica de su sistema de cine en casa inteligente, primero ejecute la prueba de análisis de sala. A continuación, ajuste la colocación de los altavoces según las recomendaciones del sistema para una distribución del sonido óptima.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Los resultados de su evaluación de idiomas virtual están listos. En función de su rendimiento, hemos creado un itinerario de aprendizaje personalizado centrado en la comunicación empresarial en francés.","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"He localizado su pedido ABC123DEF en nuestro sistema de almacén. El paquete contiene sus periféricos para videojuegos personalizados y se enviará por entrega urgente. ¿Desea que le active las notificaciones por mensaje de texto para el seguimiento del envío?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Revisando el pedido número 987654321... Veo que su paquete de instalación del hogar inteligente está programado para la semana que viene. El técnico llegará entre las 9 y las 12 de la mañana. ¿Le envío la lista de verificación detallada de la instalación?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el pedido XY-789-ZW correspondiente a su suscripción anual de mantenimiento. El servicio incluye revisiones trimestrales de todos sus dispositivos conectados. La primera inspección vence el mes que viene. ¿Le ayudo a programarla ahora?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Su pedido 2024-45678 del sistema de seguridad inteligente ha sido procesado. El equipo de instalación preconfigurará sus dispositivos antes de la entrega. ¿Desea revisar los protocolos de seguridad que vamos a configurar?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Veo que el pedido TECH-456 está registrando algunos retrasos en el envío... Voy a escalarlo ahora mismo a nuestro equipo de logística. Tendrán que coordinarse con el servicio de entrega especializado para su equipo de cine en casa.","emotion":"Tranquilo y empático (Conversacional) · Preocupado"},{"text":"Para el pedido número 123ABC456, veo que ha seleccionado nuestro paquete premium de iluminación inteligente. El sistema incluye 12 bombillas de color variable y 3 sensores de movimiento. ¿Le explico las diferentes escenas de iluminación que podemos preconfigurar?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Estoy revisando el pedido BK789CD de sus electrodomésticos inteligentes de cocina... Parece que hay un problema de compatibilidad con uno de los modelos seleccionados. Permítame ponerle en contacto con nuestro especialista en diseño de cocinas para asegurarnos de que todos los componentes funcionen a la perfección.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Su pedido 555-SRD del sistema de filtración de agua para el hogar ha sido confirmado. La instalación incluye sensores de calidad del agua y notificaciones automáticas para la sustitución de filtros. ¿Le gustaría revisar el calendario de mantenimiento?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"En relación con el pedido 56H634F5, veo que ha elegido nuestro concentrador avanzado de automatización del hogar. Empecemos por configurar sus preferencias de dispositivo y establecer las rutinas de automatización iniciales. ¿Le gustaría que le guiara a lo largo de este proceso?","emotion":"Claro e instructivo · Tranquilizador"},{"text":"El pedido número 7875678 incluye su mando a distancia universal con programación personalizada. Me consta que aún no se ha vinculado con sus dispositivos. ¿Le gustaría que le explicara paso a paso el proceso de configuración para cada uno de sus equipos de entretenimiento?","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Estoy revisando el pedido REF-456 de su frigorífico inteligente... El equipo de entrega ha indicado que hay ciertas restricciones de acceso en su dirección. Permítame ponerle en contacto con nuestro especialista en logística para planificar la mejor ruta de entrega y el equipo necesario.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Su pedido AV2024X789 del sistema de sonido premium está siendo preparado para su envío. Cada altavoz ha sido probado y calibrado de forma individual. ¿Le gustaría programar ahora el servicio de instalación profesional?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Al revisar el pedido AG7890, veo que ha seleccionado nuestro paquete de gestión energética. El sistema le ayudará a supervisar y optimizar el consumo eléctrico de todos sus dispositivos conectados. ¿Le gustaría conocer nuestras opciones de integración solar?","emotion":"Amigable y casual (Conversacional) · Entusiasta"},{"text":"Para el pedido ARK756, sus cámaras de seguridad avanzadas han sido preconfiguradas con los ajustes de su red. Permítame guiarle a través del proceso de configuración inicial y ayudarle a personalizar las zonas de detección de movimiento.","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Veo que el pedido 13579-IOT-24 incluye nuestro controlador de riego inteligente. El sistema necesitará calibrarse para las zonas específicas de su jardín y los tipos de suelo. ¿Le gustaría que le explicara cómo deben colocarse los sensores de humedad?","emotion":"Claro e instructivo · Tranquilizador"},{"text":"Su pedido QC123TEST incluye nuestro último sistema de monitorización de la calidad del aire. Veo que algunos sensores están mostrando lecturas inusuales durante la configuración inicial... Permítame ponerle en contacto con nuestro especialista en medio ambiente para garantizar una colocación y calibración óptimas.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"En cuanto al pedido 999-MEDIA-888, los componentes de su cine en casa han llegado a nuestro almacén local. El sistema incluye nuestro servicio de entrega e instalación personalizada. ¿Le gustaría programar la instalación para la semana que viene?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Estoy revisando el pedido SMART444HOME, que incluye nuestra actualización integral de domótica. Permítame ponerle en contacto con nuestro especialista en integración para asegurarnos de que todos sus dispositivos actuales queden correctamente incorporados al nuevo sistema.","emotion":"Claro e instructivo (Conversacional) · Preocupado"},{"text":"Su pedido 2024-IOT-789X para los tratamientos de ventanas inteligentes ha sido procesado. Las persianas motorizadas vendrán preprogramadas con sus horarios preferidos. ¿Le gustaría revisar las opciones de automatización al amanecer?","emotion":"Claro e instructivo · Neutral/profesional"},{"text":"Para el pedido NG456A, veo que los componentes de su red de malla todavía no se han optimizado según la distribución de su vivienda. ¿Le gustaría que le ayudara a determinar la mejor ubicación para cada nodo y así garantizar la máxima cobertura?","emotion":"Claro e instructivo · Tranquilizador"}]},{"title":"Guiones largos · CSR","kind":"scripts","hint":"Escenario + pasos. Avanza paso a paso hasta el final; cada paso es una guía, dilo con tus palabras.","items":[{"title":"Escenario 1 · Idealista Gestión","scenario":"Eres el asistente virtual de Idealista Gestión. El inquilino llama para reportar una incidencia de mantenimiento en su piso de alquiler.","steps":["Saluda y preséntate cerrando con: «Hola, le atiende el asistente virtual de Idealista Gestión. ¿En qué puedo ayudarle hoy?».","Empatiza («Lamento escuchar eso, vamos a resolverlo ahora mismo») y pide su nombre y la dirección del piso.","Verifica identidad: pídele que confirme su nombre y la fecha en que entró a vivir; abre su expediente.","Pídele que cuente con más detalle qué está pasando.","Pregunta si ha cambiado algo últimamente que pueda estar relacionado: una tormenta reciente, una obra en el piso, etc.","Confírmale que estás registrando todo para que el técnico llegue con la información completa.","Evalúa la seguridad: pregunta si esto le impide usar el piso con seguridad ahora mismo (agua estancada, olor a gas, cables al descubierto, algo urgente o peligroso).","Si no es una emergencia, indícale que programarás una visita de mantenimiento ordinaria.","Ofrece disponibilidad: este jueves de ocho de la mañana a mediodía, o el viernes de once a cuatro de la tarde; pregunta cuál le viene bien.","Reserva la franja y explica que recibirá un mensaje de confirmación y un aviso del técnico unos treinta minutos antes de llegar.","Pregunta si quiere que incluyas alguna nota para el técnico (dónde está el problema, si empeora a ciertas horas).","Pide un teléfono de contacto por si el técnico necesita llamar antes.","Pregunta si habrá un adulto en casa durante la visita; si no, explica el proceso de acceso con llave y autorización escrita previa.","Facilita el número de orden de trabajo, deletreado: dos-tres-cuatro, cinco-seis-siete, cinco-seis-siete.","Adviértele que, si el técnico determina que el daño se debe a mal uso del inquilino y no al desgaste normal, podría haber un cargo por la reparación.","Indícale que, si algo empeora antes de la cita y parece un problema de seguridad, llame a la línea de emergencias (en el reverso del contrato y en el mensaje de confirmación).","Pregunta si hay algo más en el piso que quiera comentar mientras le tienes en línea.","Cierra confirmando la cita del jueves por la mañana y agradeciendo que lo haya reportado con prontitud."]},{"title":"Escenario 2 · VivaGym","scenario":"Eres un agente de VivaGym. El cliente llama porque quiere empezar con un entrenador personal.","steps":["Saluda y preséntate: «Gracias por llamar a VivaGym, le atiende Alex. ¿Cómo está usted hoy?».","Explícale que le harás unas preguntas para asignarle al entrenador adecuado.","Pregunta por su punto de partida: si ha trabajado antes con un entrenador personal o sería su primera vez.","Pregunta qué le ha llevado a contactar ahora: si tiene un objetivo concreto o es una sensación general de querer un cambio.","Pregunta cuánto tiempo lleva haciendo ejercicio y qué ha probado por su cuenta.","Pregunta si tiene alguna lesión o algo que deba comunicar al entrenador antes de la primera sesión.","Pregunta cuánta actividad física hace actualmente en una semana normal.","Pregunta cuántos días a la semana puede comprometerse de forma realista y si prefiere mañana, mediodía o tarde.","Recomienda un entrenador que encaje (p. ej. Renee, especializada en fuerza para quien retoma el fitness) y ofrece una sesión introductoria de treinta minutos antes de contratar un paquete.","Propón horarios: este jueves a las seis de la tarde o el sábado a las nueve de la mañana; reserva el que elija.","Explica cómo prepararse: ropa cómoda, zapatillas con sujeción, llegar cinco minutos antes para el papeleo de nuevo cliente.","Explica que en la sesión el entrenador hablará de objetivos y hará una evaluación básica de movimiento, y que el precio de los paquetes se lo detallará recepción después.","Pide su correo electrónico para enviarle la confirmación.","Pide un teléfono por si el entrenador necesita contactarle.","Cierra confirmando el jueves a las seis y agradeciendo la llamada."]},{"title":"Escenario 3 · Glovo","scenario":"Eres un agente de Glovo. El cliente llama porque un pedido grande para un almuerzo de trabajo nunca llegó.","steps":["Saluda y preséntate: «Gracias por llamar a Glovo, le atiende Alex. ¿En qué puedo ayudarle hoy?»; indícale que consultas la cuenta.","Confirma cuál es el problema y que la comida no llegó; pregunta a qué hora debía entregarse.","Revisa el reparto y explica lo que ves: pedido recogido a las once y cuarto y GPS del repartidor inactivo unos veinte minutos después; señala que eso indica un fallo tras la recogida.","Discúlpate con sinceridad y pregunta si era un pedido personal o dependían de él más personas.","Confirma el contexto (almuerzo de trabajo, quince personas) y el total: ciento ochenta y siete euros.","Confirma el pedido completo para estar de acuerdo en lo que debía llegar (dos menús, tres ensaladas, cuatro bolsas de patatas fritas, quince bebidas de Mercadona).","Tramita un reembolso completo de ciento ochenta y siete euros a la tarjeta registrada; indica el plazo de tres a cinco días hábiles.","Añade un crédito de diez euros al monedero de Glovo como compensación adicional.","Ofrece rehacer el pedido hoy y confirma que sea del mismo restaurante (Mercadona).","Comprueba el tiempo de espera actual (unos cuarenta y cinco minutos de preparación, una hora a una hora y diez con la entrega) y confirma que es viable para el grupo.","Realiza el nuevo pedido sin coste y márcalo como envío prioritario.","Confirma la dirección de entrega (número treinta y cuatro de la calle de Fuencarral) y pregunta si el repartidor necesita saber algo para subir.","Explica que has marcado la cuenta del repartidor para revisión urgente y que su historial de GPS será revisado por el equipo de calidad.","Explica que, a partir de ahora, en pedidos superiores a cien euros se le asignará automáticamente un repartidor mejor valorado.","Facilita el número de confirmación del reembolso, deletreado: dos-cero-dos, cero-cero-nueve, cuatro-dos-uno.","Pide un teléfono directo para avisarle si surge algún cambio y cierra confirmando que estarás pendiente del pedido."]},{"title":"Escenario 4 · MSC Cruceros","scenario":"Eres un agente de MSC Cruceros. El cliente llama para reservar su primer crucero en familia.","steps":["Saluda y preséntate: «Gracias por llamar a MSC Cruceros, le atiende Alex. ¿En qué puedo ayudarle?».","Genera ilusión y pregunta si es su primera vez viajando con la naviera.","Pregunta si tiene un destino en mente; si duda, recomienda el Caribe para un primer viaje y pregunta fechas.","Confirma temporada (finales de febrero) y duración (siete noches) y anota que buscas opciones.","Pregunta cuántas personas viajan y las edades de los niños.","Presenta dos opciones de salida y pregunta si prefiere un barco más tranquilo o con más actividades.","Recomienda el barco que encaje y explica las opciones de camarote para cuatro (uno grande o dos comunicados).","Pregunta si prefiere interior, ventana o balcón; recomienda el balcón y consulta disponibilidad.","Lee el desglose del camarote con balcón (comidas, club infantil, entretenimiento, instalaciones), el total de la semana y las tasas portuarias de ciento veinte euros aparte.","Ofrece explicar los paquetes de bebidas (Premium para adultos a dieciocho euros por persona y día; sin alcohol para niños al mismo precio) y añádelos si acepta.","Toma los datos de los viajeros: nombres tal como aparecen en el pasaporte, vigencia de los pasaportes y fechas de nacimiento de los cuatro.","Pide el correo y el teléfono de contacto de la reserva.","Explica el pago: un depósito de cien euros hoy, saldo antes del uno de diciembre, y la política de cancelación a partir de esa fecha.","Pregunta cómo prefiere pagar (tarjeta por teléfono o enlace por correo) y envía el enlace si lo elige.","Explica los próximos pasos: registro en línea desde unos sesenta días antes, la app para seguir el barco y reservar, y las excursiones.","Facilita la referencia de reserva, deletreada: dos-cero-dos-cuatro, siete-siete-cuatro, dos-uno-cero.","Pregunta si hay algo que aclarar y cierra recordando que atendéis los siete días de la semana."]},{"title":"Escenario 5 · Iberdrola","scenario":"Eres un agente de Iberdrola. El cliente llama porque se ha quedado sin luz tras una tormenta.","steps":["Saluda y preséntate: «Gracias por llamar a Iberdrola, le atiende Alex. ¿En qué puedo ayudarle?».","Confirma que se ha quedado sin luz; pregunta a qué hora perdió el suministro y si es toda la casa o solo algunas zonas.","Pide su nombre y la dirección del suministro y abre su cuenta.","Consulta el sistema y explica que hay un corte activo en su barrio con unos trescientos cuarenta clientes afectados, que el equipo ya está en el lugar y localizó la avería hace unos cuarenta minutos.","Da la hora estimada de reposición (las nueve menos cuarto de la noche), discúlpate y explica que la tormenta suele provocar averías más complejas de lo que se ve desde fuera.","Pregunta si hay algo que anotar en la cuenta: equipos médicos, concentradores de oxígeno, algo que haga el corte más que una molestia.","Si procede, añade una prioridad médica y explica qué implica (su calle sube en la secuencia de reparaciones, aunque no garantiza ser los primeros).","Pregunta si está solo en casa y si tiene generador; si usa velas, recomiéndale precaución y linternas de pilas por riesgo de incendio.","Pregunta si su calefacción es eléctrica o de gas y valora el impacto según su situación.","Explica el posible problema secundario en la reposición: si a la hora estimada sus vecinos tienen luz y él no, que llame de inmediato para enviar a alguien a su dirección.","Indícale que puede seguir el corte en tiempo real en la web o la app, que se actualiza cada quince minutos.","Pide un móvil para añadir alertas por SMS y explica que recibirá aviso cuando su contador vuelva a estar activo y si cambia la hora estimada.","Sugiere que se mantenga en contacto con algún vecino para saber si lo suyo es un problema secundario.","Menciona la encuesta posterior por correo y anímale a responderla con sinceridad si hay retrasos.","Cierra dándole ánimo, recomendando mantener el frigorífico cerrado y repitiendo que llame si a la hora estimada no hay novedades."]},{"title":"Escenario 6 · Iberdrola","scenario":"Eres un agente de Iberdrola. El cliente llama porque no tiene luz tras una tormenta.","steps":["Saluda y preséntate: «Gracias por llamar a Iberdrola, le atiende Alex. ¿En qué puedo ayudarle?».","Confirma que no tiene luz; pregunta a qué hora se quedó sin electricidad y si es toda la casa o solo una zona.","Pide su nombre y la dirección del suministro y abre su cuenta.","Consulta el sistema y explica que hay un corte activo con unos trescientos cuarenta clientes afectados y equipo ya desplazado desde hace unos cuarenta minutos.","Da la hora estimada de reposición (las nueve menos cuarto de la noche), discúlpate y explica la complejidad de las averías por tormenta.","Pregunta si hay que anotar equipos médicos u otra circunstancia; si procede, añade prioridad médica y explica qué implica.","Pregunta si está solo, si tiene generador, y da la advertencia de seguridad sobre velas frente a linternas de pilas.","Pregunta si la calefacción es eléctrica o de gas y valora el impacto.","Explica el posible problema secundario en la reposición y qué hacer si sus vecinos recuperan la luz y él no.","Indica el seguimiento en tiempo real por web/app cada quince minutos.","Pide un móvil para alertas por SMS y explica los avisos automáticos.","Sugiere mantener contacto con un vecino como referencia.","Menciona la encuesta posterior y anima a responderla.","Cierra con ánimo y las mismas recomendaciones prácticas."]},{"title":"Escenario 7 · Bankinter Inversión","scenario":"Eres un agente de Bankinter Inversión. El cliente llama preocupado porque el saldo de su cartera ha bajado. Importante: informas y contextualizas, pero NO das consejo de inversión — lo derivas a su asesor.","steps":["Saluda y preséntate: «Gracias por llamar a Bankinter Inversión. ¿En qué puedo ayudarle hoy?».","Verifica identidad: pide su nombre completo y su PIN de seguridad; abre la cuenta.","Confirma el motivo (el saldo ha bajado) y revisa sus posiciones antes de dar cifras.","Da contexto real: la cartera ha bajado alrededor de un seis coma tres por ciento en dos semanas, frente a un mercado que cayó un cuatro coma ocho por ciento en el mismo periodo.","Explica la causa concreta del bajo rendimiento: su concentración en Northgate Technology, que cayó cerca de un dieciocho por ciento tras unos resultados por debajo de lo esperado.","Aclara que el resto de la cartera se comporta razonablemente (fondos indexados siguiendo el mercado, bonos estables).","Marca el límite con claridad: puedes explicar qué pasó y cómo está hoy, pero si debe mantener Northgate es una conversación para su asesor, porque no tienes su panorama financiero completo.","Comprueba si tiene asesor asignado (James Whitfield) y ofrece programarle una llamada para hoy.","Confirma el mejor número de contacto (el móvil que termina en siete-ocho-dos-tres) y envía la solicitud con una nota del motivo.","Aprovecha para revisar administrativos: propón pasar de extractos en papel a electrónicos y actualízalo si acepta.","Sugiere, sin presión, pasar la verificación en dos pasos de SMS a una app de autenticación por seguridad.","Pregunta cómo se siente con la configuración general de la cartera y añade a la nota del asesor cualquier tema de fondo que mencione.","Cierra resumiendo: el asesor le llama hoy con contexto, quedan hechos los cambios administrativos y la revisión pendiente queda en el orden del día."]},{"title":"Escenario 8","scenario":"Eres un agente de atención al cliente de una tienda online. El cliente llama por un pedido retrasado, quiere cambiar una talla y detecta un cargo duplicado.","steps":["Saluda con calidez, preséntate y pide su nombre o el correo de la cuenta para localizarla.","Abre la cuenta y pregunta en qué puedes ayudarle.","Sobre el retraso: revisa el seguimiento, explica que hubo un retraso en el transportista pero que debería repartirse hoy, discúlpate y ofrece enviar el enlace de seguimiento.","Si faltan artículos, comprueba si el pedido se envió en dos paquetes desde centros distintos; localiza el segundo seguimiento (entrega estimada para mañana) y ofrece enviar ambos enlaces.","Sobre el cambio de talla: explícale que lo más práctico es esperar a recibir el paquete y gestionar el cambio en la web (iniciar sesión, pedidos, «cambio») o llamando de nuevo.","Ofrece dejar una nota en la cuenta para el próximo agente: recibió una talla mediana y quiere cambiarla por una grande; menciona que tiene ciento veinte días para el cambio.","Sobre el cargo duplicado: revisa los cargos, identifica una transacción duplicada del día catorce por una actualización del sistema y discúlpate reconociéndolo como error propio.","Tramita el reembolso del cargo duplicado; indica el plazo de tres a cinco días hábiles y el correo de confirmación en menos de una hora.","Tranquilízale: no tiene que hacer nada más ni contactar con su banco; si en cinco días no aparece, que vuelva a llamar.","Cierra con un resumen: dos enlaces de seguimiento enviados, nota de cambio de talla registrada y reembolso en proceso; pregunta si necesita algo más."]},{"title":"Escenario 9","scenario":"Eres un agente de asistencia en carretera. El cliente llama desde la vía porque su coche ha quedado inmovilizado.","steps":["Saluda y localízalo primero: pídele una dirección, una intersección o el punto de referencia más cercano que vea.","Pide un resumen rápido de lo ocurrido (avería, pinchazo, accidente) y, sobre todo, confirma que él y sus acompañantes están bien.","Confírmale que envías sus datos al equipo de coordinación y que en breve tendrá a alguien de camino.","Dale indicaciones de seguridad: manténgase alejado del tráfico y, si está cerca de la calzada, sitúese bien a un lado.","Pídele que encienda las luces de emergencia y, si tiene, coloque el triángulo o se ponga el chaleco reflectante.","Aconséjale permanecer dentro o cerca del vehículo salvo que haya humo o escape de líquidos; si está solo o es de noche, dentro del coche con las puertas cerradas suele ser lo más seguro.","Pídele que cuide la batería del teléfono (cargador o modo de ahorro) para mantener el contacto.","Recopila detalles útiles: puntos de referencia visibles, si tiene un compromiso urgente (un vuelo, recoger a los hijos) y si hay medicamentos u objetos importantes que llevarse en caso de remolque.","Explícale qué pasará al llegar el técnico: se presentará, valorará reparar en el sitio o remolcar, y gestionará todo el papeleo.","Dale el aviso de seguridad: nunca se le pedirá dinero en efectivo en la carretera salvo que esté en su cobertura; si alguien le genera dudas, que permanezca en el coche y avise.","Pregúntale cómo está y quédate en línea con él hasta confirmar que la ayuda va en camino, actualizando al equipo ante cualquier cambio."]},{"title":"Escenario 10","scenario":"Eres un agente de atención al cliente. El cliente llama para devolver un iPhone dañado.","steps":["Saluda, preséntate y confirma el motivo: «Entiendo que desea devolver un iPhone con daños, vamos a resolverlo».","Pide su nombre completo y el correo o teléfono asociado a la compra; abre la cuenta.","Pregunta qué le pasa al teléfono (pantalla rota, daños por agua, algo interno o una combinación) y cuándo ocurrió el daño.","Confirma que es el dispositivo asociado a su cuenta o si fue un regalo, y anota todo para tener un registro claro.","Empatiza con lo frustrante de un teléfono dañado del que depende a diario.","Explica que las opciones dependen de cuándo lo compró, la cobertura y el tipo de daño, y que se lo explicarás paso a paso.","Verifica los datos: la compra figura del veintitrés de marzo; pide el recibo o número de pedido si lo tiene.","Comprueba garantía y cobertura; sé transparente: al estar fuera de garantía y sin cobertura activa, una devolución no cubre daños accidentales, pero hay opciones (reparación fuera de garantía, permuta o una posible excepción por buena voluntad).","Haz el diagnóstico con preguntas rápidas: estado de la pantalla, si enciende y hace llamadas, daños en la carcasa o el puerto, y si hubo exposición a líquidos.","Inicia la devolución desde tu lado antes de colgar y confirma que el correo registrado es correcto.","Ofrece opciones de envío: llevarlo a una tienda o recibir una etiqueta de envío; explica que no hace falta la caja original.","Da el plazo (dos a tres días laborables tras recibir el dispositivo) y que recibirá actualizaciones por correo.","Cubre la protección de datos: recomiéndale hacer copia de seguridad en iCloud y borrar el dispositivo (Ajustes, General, Transferir o restablecer, Borrar todo el contenido); ofrece alternativas si el teléfono no enciende.","Pregunta si tiene un dispositivo de repuesto para no quedarse incomunicado y menciona opciones de préstamo con su operador; ofrece marcar el caso como urgente.","Sé claro con el coste: la reparación sería de diecinueve euros; ofrece pago por teléfono o enlace, y garantiza que no se le cobrará de más sin su aprobación.","Cierra con un resumen y el número de caso, deletreado: tres-dos-cuatro, cinco-seis-siete, cuatro-tres-uno."]},{"title":"Escenario 11","scenario":"Eres un agente que llama en nombre del plan de salud del cliente para hacer un cuestionario de evaluación de salud confidencial.","steps":["Preséntate y explica el motivo: un cuestionario confidencial para orientarle hacia los recursos adecuados; dura diez o quince minutos; pregunta si le viene bien ahora.","Aclara la confidencialidad: lo que comparta es información sanitaria protegida y no afecta a su cobertura ni a sus primas.","Abre su ficha: pide nombre completo y fecha de nacimiento.","Verifica identidad con los últimos cuatro dígitos del número de afiliado (en su tarjeta del seguro).","Explica el formato: preguntas sobre salud general, hábitos, afecciones y estado emocional; no hay respuestas correctas y puede saltar lo que no aplique.","Salud general: cómo describiría su salud hoy (excelente, muy buena, buena, regular o mala) y cómo está comparada con el año pasado.","Antecedentes: si tiene alguna enfermedad crónica en tratamiento, si ha estado hospitalizado o ha tenido cirugía en los últimos doce meses, y cuándo fue su última revisión.","Hábitos: consumo de tabaco, nivel de actividad física semanal, alimentación, consumo de alcohol y calidad del sueño.","Bienestar emocional (con tacto): en las últimas dos semanas, tristeza, ansiedad o pérdida de interés; si el estrés afecta a su vida cotidiana; y si tiene acceso a apoyo en salud mental.","Agradece su sinceridad y reconoce que algunas preguntas son personales.","Medicación y prevención: si toma algún medicamento con receta de forma habitual y si está al día con sus revisiones preventivas.","Explica los próximos pasos: el formulario se envía al plan en uno o dos días, recibirá un resumen con recomendaciones o derivaciones, y menciona programas gratuitos que podrían aplicarle.","Pregunta si quiere modificar, aclarar o añadir algo antes de cerrar el registro.","Facilita el número de confirmación, deletreado: tres-cuatro-cinco, seis-siete-siete, siete-seis-siete.","Cierra agradeciendo su tiempo y colaboración y recordándole que puede llamar si tiene dudas sobre sus resultados."]},{"title":"Escenario 12 · Vueling","scenario":"Eres un agente de Vueling. El cliente llama para reservar un vuelo.","steps":["Saluda y preséntate: «Gracias por llamar a Vueling, le atiende Alex. ¿En qué puedo ayudarle hoy?».","Ofrece ayudar con la reserva y anuncia que harás unas preguntas para encontrar las mejores opciones.","Pregunta la ciudad de salida y si estaría abierto a aeropuertos cercanos, que a veces abaratan la tarifa.","Pregunta el destino y si es su destino final o continúa desde allí.","Pregunta las fechas y si tiene flexibilidad, explicando que mover un día puede cambiar bastante el precio.","Pregunta si es ida y vuelta o solo ida, y la fecha de regreso si procede.","Indica que consultas disponibilidad y pide un momento mientras carga el sistema.","Antes de presentar opciones, pregunta cuántos pasajeros viajan y si alguno es menor de dos años.","Pregunta si alguien necesita asistencia especial, para dejarlo anotado en la reserva.","Pregunta la preferencia de clase (Turista, Comfort Plus o Primera) y cómo prioriza precio frente a comodidad.","Pregunta su tolerancia a las escalas (directo frente a escala más barata) y si tiene número de viajero frecuente; ofrece darle de alta en el momento.","Presenta las opciones verbalizando horarios y precios: por ejemplo, directo a las siete de la mañana desde ciento ochenta y cuatro euros por persona; directo a la una y cuarenta desde ciento sesenta y un euros; con una escala desde ciento noventa y ocho; y un vuelo nocturno desde ciento diecinueve.","Cuando elija, recoge los datos de cada pasajero: nombre legal completo, fecha de nacimiento y número de viajero si lo tiene.","Explica el equipaje: mano incluida; maleta facturada a quince euros por trayecto; recomienda añadirla ahora si la necesita.","Gestiona los asientos: explica Comfort Plus (más espacio, diecinueve euros por persona y trayecto), las filas de emergencia y ofrece asientos concretos (por ejemplo dieciocho A y dieciocho B).","Recoge el contacto: correo (léelo de vuelta para confirmar), teléfono y cómo prefiere recibir los avisos (SMS, correo o ambos).","Lee el desglose completo del coste y confírmalo antes de cobrar; ofrece el seguro de viaje opcional (dieciocho euros por persona).","Procesa el pago por teléfono o mantén el itinerario reservado hasta veinticuatro horas si prefiere pagar online.","Confirma la reserva y facilita el localizador, deletreado: cuatro-cuatro-siete, ocho-ocho-dos, uno-nueve-cero.","Explica la facturación (se abre veinticuatro horas antes), la antelación recomendada al aeropuerto y las condiciones de cambio y cancelación.","Cierra con un resumen: vuelo, horario, pasajeros, asientos, equipaje y localizador, y desea un buen viaje."]}]},{"title":"Roleplay · CSR","kind":"scripts","hint":"Escenario + pasos para roleplay. Avanza por cada paso; improvisa siguiendo la guía.","items":[{"title":"Roleplay 1 · Santander","scenario":"Eres un agente de atención al cliente de Santander. El cliente llama porque ha detectado un cargo fraudulento en su cuenta.","steps":["Da la bienvenida y preséntate con tu nombre, cerrando con la pregunta: «Gracias por llamar a Santander, mi nombre es Alex. ¿En qué puedo ayudarle hoy?».","Escucha al cliente y confirma que está notificando un cargo fraudulento.","Discúlpate con sinceridad y asegúrale que harás todo lo posible por resolverlo.","Recopila los datos de identidad: nombre legal completo, número de cuenta o usuario, teléfono registrado, correo registrado, últimos cuatro dígitos de la tarjeta y fecha de nacimiento o pregunta de seguridad.","Verifica que los datos coinciden con los registrados antes de continuar.","Recopila los detalles del fraude: qué cargo considera fraudulento (importe, fecha y comercio), si conserva la tarjeta física, si alguien más tiene acceso a la cuenta y si ha comprado antes en ese comercio.","Aplica protección inmediata: bloquea o congela temporalmente la tarjeta o cuenta e indícale los pasos de seguridad adicionales, como cambiar la contraseña y activar la verificación en dos pasos.","Confirma en voz alta el importe reclamado —quince euros— y el comercio —Mercadona— para validar los datos.","Facilítale el número de caso, deletreado: cero-siete-cuatro-nueve-uno-ocho-tres-ocho-uno-siete-dos.","Explica el plazo de investigación: entre cinco y diez días hábiles.","Informa de los próximos pasos: es posible que le contactemos para más información, debe vigilar su cuenta por si hay más actividad sospechosa, y confirma el mejor número de contacto para el seguimiento.","Cierra la llamada: pregunta si necesita algo más, transmítele que su cuenta está segura y despídete cordialmente: «Gracias por comunicárnoslo — a partir de ahora nos encargamos nosotros»."]},{"title":"Roleplay 2 · Uber Eats","scenario":"Eres un agente de atención al cliente de Uber Eats. El cliente llama porque su pedido nunca llegó.","steps":["Saluda con calidez y preséntate: «Gracias por llamar a Uber Eats, ¿en qué puedo ayudarle hoy?».","Empatiza con la situación: «Lamento escuchar eso, haré todo lo posible por ayudarle de inmediato».","Recopila los datos del cliente: nombre completo, teléfono o correo asociado a la cuenta, número de pedido y dirección de entrega.","Pregunta cuál es el problema concreto, ofreciendo las categorías habituales: el pedido no llegó, artículos incorrectos, faltan artículos, comida en mal estado, entrega tardía o cargo incorrecto.","Pregunta la fecha y hora del pedido, en qué restaurante se hizo, y si ya ha intentado contactar con el repartidor o el restaurante.","Indícale que estás localizando el pedido en el sistema y confirma en voz alta la dirección de entrega, los artículos y el importe total.","Comprueba el estado de la entrega y coméntale que en el sistema figura como «entregado», lo que no coincide con lo que él describe.","Resuelve ofreciendo un reembolso, en crédito o al método de pago original según la política de la empresa.","Comunica la resolución con claridad: «He tramitado un reembolso completo de catorce euros con noventa y nueve al método de pago original».","Indica el plazo del reembolso: entre tres y cinco días hábiles.","Facilita el número de caso, deletreado: A-G-T guion cinco-dos-tres guion cinco-seis-siete guion tres-cuatro-cinco-seis.","Explica los próximos pasos: recibirá un correo de confirmación, puede revisar la app para ver el estado del reembolso, y que vuelva a llamar si no se resuelve en el plazo indicado.","Cierra la llamada: pregunta si necesita algo más, discúlpate de nuevo por las molestias y termina en positivo: «Le agradecemos que nos lo haya informado y esperamos que su próxima experiencia sea excelente»."]},{"title":"Roleplay 3 · Iberia","scenario":"Eres un agente de atención al cliente de Iberia. El cliente llama porque quiere reservar un vuelo.","steps":["Saluda con calidez y preséntate: «Gracias por llamar a Iberia, soy su asistente virtual. ¿En qué puedo ayudarle hoy?».","Escucha la solicitud y confirma que desea reservar un vuelo; hazle saber que le guiarás durante todo el proceso.","Recopila los datos del cliente: nombre legal completo tal como aparece en su documento de identidad o pasaporte, fecha de nacimiento, teléfono y correo para la confirmación, y número de programa de fidelización si dispone de uno.","Indícale que estás consultando su cuenta.","Obtén las preferencias de viaje: origen, destino, fechas preferidas, solo ida o ida y vuelta —con fecha de regreso si procede—, número de pasajeros y edades de los menores, clase preferida, aerolíneas de preferencia y si tiene flexibilidad de fechas.","Busca y presenta dos opciones que mejor se adapten, con: número de vuelo y aerolínea, horarios de salida y llegada, número de escalas, duración total, precio por persona —ciento cincuenta y seis euros— y coste total, y franquicia de equipaje con tarifas adicionales —diez euros de suplemento por maleta facturada.","Destaca la opción con mejor relación calidad-precio o la más conveniente y responde a las dudas del cliente.","Confirma los datos de cada pasajero: nombre legal completo, fecha de nacimiento, número de pasaporte o DNI para vuelos internacionales, y caducidad y país emisor del pasaporte.","Ofrece servicios adicionales indicando el coste de cada uno antes de confirmarlo: equipaje facturado, selección de asiento, seguro de viaje, preferencias de menú, alquiler de coche u hotel, y traslado al aeropuerto.","Revisa y confirma la reserva leyendo el resumen completo: pasajeros, número de vuelo, aerolínea y ruta, fechas y horarios, clase y asiento, extras incluidos y desglose del precio total.","Pide al cliente que confirme que todo es correcto antes de procesar el pago.","Procesa el pago: recopila los datos de tarjeta, confirma que se ha aprobado e informa de las posibles tarifas de cancelación o cambio según la tarifa.","Facilita la confirmación: proporciona el localizador, indica que se enviará un correo, informa de las opciones de facturación y del tiempo recomendado de llegada al aeropuerto, y recuerda comprobar los requisitos de visado en destino.","Cierra la llamada: pregunta si necesita algo más, deséale un buen viaje y agradece que haya elegido Iberia: «Ha sido un placer gestionar su viaje — ¡esperamos que disfrute de un viaje inmejorable!»."]},{"title":"Roleplay 4 · Movistar","scenario":"Eres un agente de atención al cliente de Movistar. El cliente llama porque tiene una avería de internet en su zona.","steps":["Saluda al cliente por llamar a Movistar y pregúntale en qué puedes ayudarle.","Pregunta cuándo comenzó la avería y si afecta a todos los dispositivos o solo a algunos.","Pide el nombre del cliente y la dirección del servicio para consultar la cuenta.","Confirma la última hora de sincronización del módem para verificar que la avería es real y no un problema de su equipo.","Explícale que se trata de un problema en el nodo de su zona y que reiniciar el router no lo va a solucionar.","Indícale que hay otras cincuenta y cuatro direcciones afectadas, para que sepa que es una incidencia conocida y activa que ya se está gestionando.","Confirma que ya hay un técnico de campo desplazado y facilita la ventana estimada de restauración: hoy a las cuatro de la tarde.","Advierte con honestidad que, si el técnico encuentra daños físicos en la línea, el plazo podría extenderse más allá de la estimación inicial.","Recomiéndale usar el punto de acceso de su móvil como solución temporal para cualquier gestión urgente.","Pregúntale si trabaja desde casa para valorar el impacto y dejarlo registrado en las notas de la cuenta.","Explícale que podría recibir un abono por avería si el corte se prolonga, y ofrécete a marcar su cuenta de forma preventiva ahora mismo para que no tenga que volver a llamar.","Indícale la sección de averías de la app, donde puede seguir en tiempo real el progreso del técnico y el estado del ticket.","Pide su número de móvil para suscribirle a las alertas por SMS sobre la avería.","Confírmale que recibirá un aviso automático en el momento en que su módem recupere la sincronización, no solo cuando la avería general quede marcada como resuelta.","Aconséjale que vuelva a llamar si el aviso de restauración no llega a una hora concreta, momento en que el ticket pasará a prioritario.","Cierra con calidez y tranquilízale asegurándole que el equipo está trabajando en ello en este momento."]},{"title":"Roleplay 5 · El Corte Inglés","scenario":"Eres un agente de atención al cliente de El Corte Inglés. El cliente llama porque le falta un paquete que figura como entregado.","steps":["Saluda al cliente de El Corte Inglés y pregúntale en qué puedes ayudarle.","Expresa empatía de inmediato cuando comunique que le falta un paquete y pídele el número de pedido o el correo de su cuenta.","Consulta el pedido y confirma en voz alta el artículo —un televisor Samsung—, la fecha de envío —quince de mayo— y la empresa de transporte —MRW.","Léele el estado del seguimiento —«entregado»— con la fecha y hora exactas —quince de mayo a las dos de la tarde— y el lugar de depósito indicado por el transportista.","Explícale que «entregado» no siempre significa que el paquete esté a su alcance, y descríbele los tres escenarios habituales: registro tardío con entrega al día siguiente, paquete dejado en un acceso alternativo, o robo tras la entrega.","Antes de escalar, pregúntale si ha revisado accesos alternativos y si ha consultado a los vecinos, para evitar un reemplazo innecesario.","Pregúntale si la dirección es una casa o un edificio de apartamentos, ya que influye en la probabilidad de una entrega errónea.","Cuando confirme que el paquete no aparece, inicia un envío de reemplazo durante la misma llamada para que no tenga que esperar a la investigación con el transportista.","Pregúntale si prefiere una entrega con firma obligatoria en su domicilio o recoger el reemplazo en una oficina del transportista.","Establece expectativas claras: el nuevo número de seguimiento llegará por correo en pocas horas y el reemplazo tardará entre tres y cuatro días hábiles.","Tranquilízale indicándole que, si el paquete original apareciera, puede llamar para recibir una etiqueta de devolución gratuita.","Cierra la llamada con un resumen de lo gestionado y de lo que puede esperar a continuación."]},{"title":"Roleplay 6 · Adeslas","scenario":"Eres un agente de atención al cliente de Adeslas. El cliente llama porque no entiende un resumen de prestaciones.","steps":["Preséntate a ti y a Adeslas, y pregúntale al cliente en qué puedes ayudarle.","Cuando mencione que no entiende el resumen, normalízalo de inmediato: estos documentos son difíciles de interpretar y no debe sentirse culpable por no comprenderlos.","Solicita el número de asegurado y la fecha del servicio que aparece en el resumen para localizar la reclamación.","Consulta la reclamación y confirma en voz alta el tipo de servicio antes de dar ninguna explicación.","Explica paso a paso el cálculo de la franquicia: la franquicia anual del plan —mil euros—, el importe ya aplicado —ciento cincuenta y seis euros con setenta y ocho—, lo que aportó esta reclamación —quince euros— y el saldo restante —mil ochocientos cuarenta y tres euros con veintidós.","Aclara que el importe adeudado se abona directamente al proveedor, no a la aseguradora, y aconséjale contactar con el departamento de facturación del proveedor si aún no ha pagado.","Invítale a señalar cualquier otro punto del documento que le parezca confuso; no des por sentado que una sola explicación resuelve todas sus dudas.","Ofrécete a enviarle por correo un resumen en lenguaje sencillo sobre el funcionamiento de la franquicia y el límite de gasto anual.","Cierra recalcando que llamar por dudas sobre el resumen es habitual y recomendable, para que se sienta con total confianza de volver a contactar."]},{"title":"Roleplay 7 · Zara","scenario":"Eres un agente de atención al cliente de Zara. El cliente llama porque quiere devolver un artículo fuera del plazo establecido.","steps":["Saluda al cliente en Zara y pregúntale en qué puedes ayudarle.","Busca el pedido con el correo o el número de pedido e identifica el artículo —un jersey rojo talla mediana— y la fecha de compra —cinco de mayo.","Infórmale del plazo habitual de devolución de sesenta días y de que el artículo está fuera de ese plazo.","Antes de decidir nada u ofrecer una solución, pregunta el motivo de la devolución, ya que determina las opciones disponibles.","Si el motivo es una diferencia de color o apariencia respecto a la web, valídalo como un problema legítimo y habitual, no como un error del cliente.","Presenta dos opciones: crédito completo en tienda con etiqueta de devolución prepagada procesada de inmediato, o escalada al responsable para una posible devolución en efectivo en veinticuatro horas, sin garantía.","Si elige el crédito en tienda, recoge su número de tarjeta.","Solicita la fecha de caducidad y el código de seguridad.","Recoge su correo para enviarle la etiqueta de devolución.","Procésalo durante la llamada, confirma que estará activo en veinticuatro horas y sin caducidad, y envía la etiqueta prepagada al correo registrado.","Recuérdale que el crédito quedará confirmado oficialmente cuando el almacén reciba el artículo devuelto.","Cierra la llamada con un resumen cercano de lo gestionado y de lo que puede esperar a continuación."]},{"title":"Roleplay 8 · IKEA","scenario":"Eres un agente de atención al cliente de IKEA. El cliente llama porque ha visto un precio más bajo en la competencia y pide una igualación.","steps":["Saluda al cliente de IKEA y pregúntale en qué puedes ayudarle.","Cuando pida la igualación de precio, solicita el número de pedido o el correo de la cuenta antes de preguntar nada sobre el precio de la competencia.","Busca el pedido y confirma el artículo —una estantería Billy—, la fecha de compra —quince de junio— y el precio pagado —ciento veintinueve euros— antes de evaluar nada.","Pide el nombre del competidor, la URL o el anuncio exacto con el precio más bajo, y confirma que es el mismo modelo, talla, color y configuración, no solo el mismo nombre de producto.","Indícale que le realizarás un reembolso de quince euros, que es la diferencia de la igualación.","Pide su tarjeta para tramitar el reembolso.","Confirma el plazo del reembolso: normalmente entre tres y cinco días hábiles según el método de pago.","Cierra la llamada confirmando qué puede esperar y si necesita alguna gestión adicional por su parte."]},{"title":"Roleplay 9 · Orange","scenario":"Eres un agente de atención al cliente de Orange . El cliente llama porque su internet va lento.","steps":["Coge la llamada, saluda, preséntate y pregúntale en qué puedes ayudarle.","Cuando informe de velocidades lentas, pregúntale desde cuándo ocurre y si es constante o solo en momentos concretos del día.","Pregúntale si afecta a todos los dispositivos o solo a algunos, y si ocurre tanto por cable como por wifi.","Pide su número de cuenta o teléfono para consultar la cuenta.","Accede a la cuenta y verifica la velocidad contratada en el plan.","Comprueba el sistema de monitorización de red por si hay incidencias activas o nodos degradados en su zona antes de pedirle comprobaciones por su cuenta.","Si la red está bien, pídele que ejecute una prueba de velocidad desde un dispositivo por cable, explicándole que el wifi se ve afectado por la distancia, las interferencias y la antigüedad del equipo.","Pídele que comparta el resultado —descarga, subida y ping— y compáralo con el plan contratado.","Si los niveles de señal están degradados, programa una visita técnica y explica qué comprobará el técnico, sin plantearlo como una visita genérica.","Pregúntale si el router es antiguo o lo dio la compañía, comprueba si hay actualización de equipo disponible e indica el proceso o el coste —diez euros.","Pregúntale si ha añadido recientemente dispositivos, servicios de streaming o domótica, ya que el aumento de demanda es una causa habitual de ralentización percibida.","Si ocurre a una hora concreta, comprueba si está en una zona de alta congestión en horas de tarde.","Registra todos los resultados y pasos de diagnóstico en las notas de la cuenta antes de cerrar.","Si no se resuelve en la llamada, indica un plazo concreto de seguimiento y confirma quién es responsable del siguiente paso: el técnico, el equipo de red o el propio cliente."]},{"title":"Roleplay 10","scenario":"Eres un agente del departamento de reclamaciones de Sanitas . El cliente llama porque le han denegado un medicamento en la farmacia.","steps":["Contesta, preséntate junto con tu departamento —reclamaciones— y pregunta en qué puedes ayudar.","Cuando informe de que le denegaron un medicamento, solicita su número de afiliado y fecha de nacimiento antes de preguntar cualquier otra cosa.","Pide el nombre del medicamento denegado para consultar su estado de cobertura.","Confirma si la denegación se debe a una exclusión, un problema de autorización, un requisito de tratamiento previo o un problema de cantidad.","Si requiere autorización previa, explica que el médico prescriptor debe enviar una justificación clínica antes de que el plan cubra el medicamento.","Indícale que contacte hoy mismo con su médico y solicite que el centro presente la solicitud de autorización previa; facilítale el canal que debe usar el médico para enviarla.","Pregúntale si necesita el medicamento con urgencia; en ese caso, explícale el proceso de suministro urgente que podría permitirle obtener una cantidad limitada mientras se tramita.","Explica el proceso de reclamación si desea impugnar formalmente la denegación, incluyendo el plazo establecido —dos días hábiles.","Aconséjale preguntar en su farmacia por programas de asistencia al paciente si el medicamento es urgente.","Confirma los próximos pasos con claridad antes de cerrar: el cliente gestionará con su médico la autorización y puede volver a llamar en cuarenta y ocho horas si surge algún problema."]},{"title":"Roleplay 11 · Amazon","scenario":"Eres un agente de atención al cliente de Amazon . El cliente llama porque ha recibido un artículo dañado.","steps":["Responde, saluda al cliente y pregúntale en qué puedes ayudarle.","Cuando indique que recibió un artículo dañado, discúlpate de forma sincera e inmediata; no empieces con preguntas de política ni le pidas que demuestre el daño antes de mostrar empatía.","Solicita el número de pedido o el correo de la cuenta para consultar el pedido.","Pídele que describa el daño —si afecta al producto, al embalaje o a ambos— y si el artículo es inservible o funciona parcialmente.","Pregunta si la caja exterior presentaba daño visible al recibirlo, para determinar si el daño ocurrió en transporte o antes del envío.","No exijas fotografías como condición para resolver; si son útiles para calidad, pídelas como paso opcional, nunca obligatorio.","Determina si desea un reemplazo o un reembolso, sin dar por supuesta ninguna opción ni inclinarle hacia una.","Si desea reemplazo, comprueba disponibilidad en stock antes de confirmarlo; si está agotado, díselo de inmediato y ofrece un plazo estimado o una alternativa.","Si desea reembolso, confirma si será al método de pago original e indica un plazo concreto de tramitación.","Inicia durante la llamada la solución elegida; no le digas que harás un seguimiento posterior salvo que sea inevitable.","Si debe devolverse el artículo, genera de inmediato una etiqueta de devolución prepagada al correo registrado; no le pidas que gestione él el envío de un artículo dañado.","Si el artículo es grande, frágil o pesado y la devolución es poco práctica, valora autorizarle a conservarlo o desecharlo, y registra la decisión con su motivo.","Notifica el informe de daños al equipo de almacén y calidad con los detalles del pedido, indicando si parece un problema de embalaje, de preparación o de transporte.","Confirma el número de seguimiento del reemplazo o el plazo del reembolso antes de cerrar.","Despídete reconociendo que recibir un artículo dañado es muy molesto y agradécele que lo haya comunicado en lugar de desecharlo."]},{"title":"Roleplay 12 · Vodafone","scenario":"Eres un agente de atención al cliente de Vodafone . El cliente llama porque se muda y quiere trasladar su servicio.","steps":["Responde, saluda, preséntate y pregúntale en qué puedes ayudarle.","Cuando indique que va a mudarse, solicita su nueva dirección antes de nada: la disponibilidad de cobertura allí determina todas las demás opciones.","Comprueba la cobertura en la nueva dirección con la herramienta de disponibilidad; no la des por supuesta por cercanía a la dirección actual.","Si hay cobertura, confirma qué tarifas y velocidades están disponibles allí, que pueden diferir de las actuales.","Si su tarifa actual no está disponible en la nueva dirección, explícaselo con claridad y preséntale las opciones; no le inscribas en una tarifa que no ha pedido.","Pregúntale la fecha de mudanza y la de instalación preferida, y confirma las franjas disponibles antes de comprometer una fecha.","Explica qué ocurrirá con el servicio en la dirección actual: la fecha exacta de desconexión y si se mantiene hasta el fin del ciclo de facturación.","Confirma si es responsable de devolver el equipamiento de la dirección actual y explícale el procedimiento y el plazo.","Pregunta si hará la instalación por su cuenta o necesita técnico, y explica la diferencia de plazo y coste si procede.","Si se requiere técnico, confirma la franja de la cita, que deberá haber alguien mayor de dieciocho años presente y a qué zonas necesitará acceder.","Comprueba si está en contrato y si el traslado conlleva penalización por cancelación anticipada; si la hay, infórmale antes de tramitar, no después.","Si la nueva dirección no tiene cobertura, no pases directo a cancelar: comprueba si está prevista ampliación de cobertura y en qué plazo.","Si no hay cobertura prevista, inicia la cancelación sin obstáculos: tiene un motivo legítimo y no debe sentirse presionado.","Confirma el importe de la factura final, la devolución del equipamiento y el plazo de cierre de la cuenta si se cancela por falta de cobertura.","Si el servicio se traslada, envía un correo de confirmación con la nueva dirección, la fecha de instalación, los detalles de la tarifa y la información de nuevo equipamiento antes de cerrar."]},{"title":"Roleplay 13 · DKV","scenario":"Eres un agente de atención al cliente de DKV . El cliente llama porque quiere saber qué cubre su plan en salud mental.","steps":["Contesta, preséntate junto con tu departamento y pregunta en qué puedes ayudar.","Cuando pregunte por la cobertura de salud mental, accede a su cuenta de inmediato; no des información genérica del plan antes de confirmar qué cubre su plan específico.","Solicita el número de afiliado y la fecha de nacimiento para verificar identidad y acceder a las prestaciones correctas.","Pregúntale si busca terapia ambulatoria, hospitalización, psiquiatría y gestión de medicación, o una combinación; cada opción puede tener reglas de cobertura y copago distintas.","Accede a la sección de prestaciones de salud mental y revísala antes de hablar: confirma si aplica franquicia, copago o coseguro, y si hay límite de sesiones.","Explica en términos sencillos las reglas de cobertura de su póliza en salud mental respecto a otros servicios comparables.","Pregúntale si ya tiene un profesional en mente o necesita ayuda para encontrarlo; esto determina si harás una explicación de prestaciones o una búsqueda de profesionales.","Si necesita profesional, consulta específicamente la red de salud mental, que suele gestionarse aparte de la red médica general.","Antes de dar nombres, confirma que cada profesional acepta nuevos pacientes y el plan específico del cliente, ya que los cupos cambian y los directorios se desactualizan.","Pregúntale sus preferencias —videollamada o presencial, género del terapeuta, especialidad como trauma o ansiedad, idioma— y filtra antes de presentar opciones.","Si llama en crisis o con síntomas urgentes, no lo trates como una consulta rutinaria: facilita de inmediato los recursos de atención en crisis y atiende la pregunta de prestaciones en segundo lugar.","Explica si el plan exige una derivación previa para acudir a un profesional de salud mental.","Confirma si su franquicia aplica a las consultas de salud mental y cuánto se ha cubierto ya en el año, porque afecta a lo que pagará en su primera cita.","Aconséjale confirmar la cobertura con la consulta del profesional antes de la primera cita y explícale qué preguntar: nombre del plan, número de afiliado y si el profesional factura dentro de la red.","Pregúntale si necesita algo más sobre salud mental o cualquier otra prestación antes de cerrar.","Despídete con calidez y sin frialdad clínica: puede estar llamando bajo una presión personal considerable."]},{"title":"Roleplay 14 · Amazon Prime","scenario":"Eres un agente de atención al cliente de Amazon Prime . El cliente llama porque disputa un cargo por renovación automática.","steps":["Contesta, saluda al cliente y pregúntale en qué puedes ayudarle.","Cuando dispute el cargo, consulta la cuenta antes de pedirle datos: el historial te dirá más que su memoria en la mayoría de los casos.","Identifica el producto de suscripción, la fecha del cargo, el importe y la fecha de renovación que lo generó.","Revisa el historial para saber cuándo se dio de alta la suscripción, por qué canal, y si se apuntó de forma explícita o mediante una promoción o complemento en la compra.","Comprueba si se le envió un aviso de renovación antes del cargo; la mayoría de las suscripciones deben avisar y debes confirmar que se hizo.","Verifica si el aviso se envió al correo correcto que consta en el archivo; si su correo había cambiado y el aviso fue a uno antiguo, eso es determinante.","No le preguntes si recuerda haberse dado de alta antes de consultar tú mismo el registro; llega a la conversación con los hechos en la mano.","Si el registro muestra una aceptación clara y el aviso se envió bien, explícale las fechas concretas de inscripción y de aviso antes de explicar el cargo.","Si la inscripción fue por un complemento promocional con texto de aceptación poco claro, trátalo como caso ambiguo y da la razón al cliente en lugar de defender el proceso.","Si el aviso no se envió o fue a una dirección incorrecta, procesa un reembolso completo sin exigir más justificación: es un error administrativo de la empresa.","Cancela la suscripción durante la llamada, se apruebe o no el reembolso; no hagas que tenga que pedir la cancelación por separado.","Confirma la fecha efectiva de cancelación y si conserva acceso a los beneficios hasta el final del período pagado.","Si hay reembolso, confirma importe, método y plazo concreto en días hábiles, sin dar un margen vago.","Si no se aprueba, explica exactamente el motivo, cita las fechas de inscripción y aviso, y facilita información clara sobre el proceso de escalado o reclamación.","Registra el resultado en la cuenta y notifica al equipo de producto los patrones recurrentes de texto de aceptación poco claro si no es el primer caso."]},{"title":"Roleplay 15 · Movistar Empresas","scenario":"Eres un agente de atención al cliente de Movistar Empresas . El cliente llama porque hay una avería técnica en una cuenta de empresa.","steps":["Contesta, saluda, confirma que hablas con el titular o un contacto autorizado y pregúntale en qué puedes ayudarle.","Cuando comunique un problema técnico en cuenta de empresa, trata la urgencia como mayor que la de un cliente residencial desde el primer momento: la interrupción tiene impacto económico directo.","Solicita el número de cuenta y la naturaleza del problema antes de consultar la cuenta, para navegar más rápido a la sección correcta.","Consulta la cuenta y confirma el tipo de servicio, el nivel de SLA si aplica y si tiene cola de soporte dedicada o gestor de cuenta asignado.","Pregunta cuánto lleva ocurriendo, cuál es el impacto —empleados sin trabajar, TPV caído, telefonía afectada— y cuántas ubicaciones o usuarios están afectados.","Revisa la monitorización de red del circuito o conexión dedicada de la empresa, que suele tener infraestructura independiente del servicio residencial.","Si detectas un fallo a nivel de red, abre un ticket prioritario de inmediato y escala al equipo técnico de empresas; no intentes resolver un fallo de circuito con los pasos residenciales.","Proporciona el número de ticket durante la llamada, no después: el cliente necesita una referencia para el seguimiento.","Confirma el proceso de escalado: quién gestiona el ticket, cuál es su función y cómo recibirá las actualizaciones.","Pregúntale si la empresa dispone de conexión de respaldo; si no y la interrupción va a prolongarse, sugiere opciones temporales como un punto de acceso móvil o un operador de respaldo si procede.","Confirma el método de contacto preferido para actualizaciones —teléfono, correo o SMS— y el mejor número o dirección en horario laboral.","Establece una cadencia de actualizaciones proactivas: comprométete a contactar a un intervalo concreto aunque no haya solución, para que no tenga que llamar él.","Si interviene un proveedor externo o un punto fuera de tu red, explícalo con claridad e indica qué estás haciendo para involucrar a ese tercero; no lo uses como excusa para desentenderte.","Documenta en las notas de la cuenta, en tiempo real, el cronograma de la interrupción, cada paso de diagnóstico y cada compromiso adquirido.","Antes de cerrar, confirma si el SLA se ha incumplido o corre riesgo, e inicia de forma proactiva el proceso de crédito o compensación; no esperes a que lo pida el cliente."]},{"title":"Roleplay 16 · Sanitas","scenario":"Eres un agente de atención al cliente de Sanitas . El cliente llama porque sus costes han subido a principio de año y no lo entiende.","steps":["Contesta, preséntate junto con tu departamento y pregunta en qué puedes ayudar.","Cuando exprese confusión por el aumento de costes a principio de año, consulta la cuenta y comprueba la fecha de renovación de la póliza antes de pedirle más detalles.","Confirma si el año de la póliza coincide con el año natural o si es un año no estándar: no todas se renuevan el uno de enero.","Solicita el número de asegurado y la fecha de nacimiento para verificar identidad antes de hablar de información financiera.","Consulta los saldos de franquicia y de gasto máximo anual del año anterior y del actual para hablar con cifras exactas.","Explica en lenguaje sencillo qué significa el reinicio de la franquicia: el importe acumulado del año anterior no se traslada y comienza desde cero.","Confirma el importe exacto de la franquicia del año actual; si ha cambiado tras la renovación, indícale el importe anterior y el nuevo.","Consulta las reclamaciones recientes del nuevo año y explica paso a paso por qué han supuesto mayor gasto, vinculándolo a los servicios concretos que recibió, no en abstracto.","Si tiene una póliza familiar, explica los umbrales individual y familiar de la franquicia y cómo interactúan, ya que es una fuente habitual de confusión.","Si su póliza cambió en el periodo de renovación y la nueva tiene mayor franquicia, reconócelo con claridad para que no crea que es solo el reinicio del mismo plan.","Si no eligió activamente el nuevo plan y fue renovado automáticamente, explícale el proceso y si hay plazo para hacer cambios.","Asesórale sobre cómo seguir el progreso de su franquicia durante el año, a través del portal del asegurado y llamando al servicio, para que no se lleve sorpresas.","Ofrécete a revisar procedimientos o recetas próximos para que sepa qué gasto tendrá antes de alcanzar la franquicia.","Cierra confirmando el saldo actual de su franquicia y cuáles son sus próximos pasos si tiene más dudas sobre reclamaciones concretas."]},{"title":"Roleplay 17 · Zalando","scenario":"Eres un agente de atención al cliente de Zalando . El cliente llama porque hay un problema con un pedido de regalo.","steps":["Contesta, saluda al cliente y pregúntale en qué puedes ayudarle.","Cuando comunique un problema con un pedido de regalo, pregúntale de inmediato si es el remitente o el destinatario: esto determina a qué información tiene acceso y qué acciones puedes realizar.","Si es el remitente, accede a su cuenta con su correo o número de pedido.","Si es el destinatario, pídele el número de pedido si lo tiene; si no, pide el nombre del remitente y la dirección de envío para localizar el pedido.","Atiende las llamadas de destinatarios con especial cuidado con la privacidad: no reveles datos de la cuenta del remitente, el método de pago ni nada que pueda arruinar una sorpresa.","Pregunta cuál es el problema concreto —retraso, artículo equivocado, artículo dañado, mensaje de regalo faltante u otro— antes de consultar los detalles.","Accede al pedido y comprueba las opciones de regalo seleccionadas: envoltorio, mensaje, dirección de facturación separada, para entender qué debía ocurrir.","Si faltaba el mensaje de regalo, consulta el texto en el pedido y ofrece enviárselo al destinatario por correo o incluirlo con un reemplazo.","Si se envió el artículo equivocado, trátalo como caso estándar de artículo incorrecto, pero ten en cuenta que el destinatario puede no conocer el precio y no lo menciones.","Si llegó dañado, gestiona un reemplazo sin exigir al destinatario que devuelva el artículo: imponer una devolución a quien recibe un regalo es una mala experiencia.","Si se enviará un reemplazo, confirma la dirección del destinatario que ya figura en el pedido en lugar de pedírsela de nuevo, para que no sienta que se le está verificando.","Si hay que contactar con el remitente para resolverlo —por ejemplo, para reautorizar un pago—, contáctale directamente y no a través del destinatario.","No envíes correos de confirmación con información de precios al destinatario si el regalo se compró con dirección de facturación separada; confirma a dónde irán las comunicaciones antes de tramitar nada.","Si no puede resolverse sin contactar con el remitente, explícaselo al destinatario y confirma que se contactará con el remitente sin revelar el motivo si así lo prefiere.","Cierra confirmando qué puede esperar el destinatario o el remitente y en qué fecha; los regalos suelen tener urgencia vinculada a un evento, reconócelo cuando proceda."]}]}]};


/* ============================================================= *
 *  Decagon — Teleprompter Studio
 *  UI is localizable (ES / EN / DE). Scripts are content and are
 *  never translated by the UI language — they are edited/imported.
 * ============================================================= */

/* ---------------- i18n (UI only) ----------------------------------- */
const I18N = {
  es: {
    _name: "Español",
    tagline: "Teleprompter para sesiones de voz",
    home_eyebrow: "Estudio de guiones · Voice actors",
    home_title: "Guía las sesiones de\ngrabación con un\nteleprompter claro.",
    home_lead: "Elige el idioma de la interfaz, gestiona tus guiones y frases, y muéstralos en pantalla para el actor de voz. Sin grabación: solo lectura guiada.",
    home_applang: "Idioma de la aplicación",
    home_applang_hint: "No afecta a los guiones. Cada ingeniero puede trabajar en su idioma.",
    home_enter: "Entrar a la biblioteca",
    home_import: "Importar JSON",
    hub_eyebrow: "Biblioteca de guiones",
    hub_title: "Secciones y frases",
    hub_lead: "Añade, edita o importa guiones. Abre cualquier sección como teleprompter para la sesión.",
    hub_new_section: "Nueva sección",
    hub_import: "Importar JSON",
    hub_export: "Exportar JSON",
    hub_open: "Abrir teleprompter",
    hub_manage: "Gestionar",
    hub_add_item: "Añadir elemento",
    hub_empty_title: "Tu biblioteca está vacía",
    hub_empty_lead: "Crea una sección o importa un JSON para empezar.",
    hub_sections_count: (n) => `${n} ${n === 1 ? "sección" : "secciones"}`,
    kind_phrases: "Frases",
    kind_scripts: "Guiones",
    kind_phrases_desc: "Líneas cortas, con emoción opcional.",
    kind_scripts_desc: "Textos largos para lectura continua.",
    items_word: (n) => `${n} ${n === 1 ? "elemento" : "elementos"}`,
    lang_label: "Idioma",
    // editor
    m_new_item: "Nuevo elemento",
    m_edit_item: "Editar elemento",
    m_new_section: "Nueva sección",
    m_edit_section: "Editar sección",
    f_item_title: "Título (opcional)",
    f_item_text: "Texto",
    f_item_emotion: "Emoción (opcional)",
    f_emotion_ph: "p. ej. Entusiasta",
    f_section_name: "Nombre de la sección",
    f_section_hint: "Indicación (opcional)",
    f_section_type: "Tipo",
    save: "Guardar",
    cancel: "Cancelar",
    del: "Eliminar",
    del_section_q: "¿Eliminar esta sección y todos sus elementos?",
    del_item_q: "¿Eliminar este elemento?",
    text_required: "El texto no puede estar vacío.",
    name_required: "El nombre no puede estar vacío.",
    // import
    imp_title: "Importar guiones (JSON)",
    imp_desc: "Sube un archivo .json o pega el contenido. Debe seguir el formato de la plantilla.",
    imp_choose: "Elegir archivo",
    imp_paste: "…o pega el JSON aquí",
    imp_mode: "Al importar",
    imp_replace: "Reemplazar biblioteca",
    imp_append: "Añadir a la biblioteca",
    imp_do: "Importar",
    imp_template: "Descargar plantilla",
    imp_ok: (n) => `Importado: ${n} ${n === 1 ? "sección" : "secciones"}`,
    imp_err: "JSON no válido o formato incorrecto.",
    // teleprompter
    tp_back: "Biblioteca",
    tp_prev: "Anterior",
    tp_next: "Siguiente",
    tp_of: "de",
    tp_sections: "Secciones",
    tp_font: "Tamaño",
    tp_autoscroll: "Autoscroll",
    tp_covered: "Cubierto",
    tp_mark: "Marcar cubierto",
    tp_empty: "Esta sección no tiene elementos todavía.",
    tp_add_first: "Añadir el primero",
    tp_edit: "Editar",
    toast_exported: "Biblioteca exportada",
    toast_saved: "Cambios guardados",
    covered_of: (a, b) => `${a}/${b} cubierto`,
    nav_welcome: "Inicio",
    sys_lang_menu: "Idioma de la aplicación (sistema)",
    script_region_menu: "Idioma y región de los guiones",
    instr_title: "Instrucciones del sistema",
    instr_desc: "Independientes de las secciones de grabación.",
    instr_read: "Leer",
    instr_edit: "Editar",
    instr_modal: "Editar instrucciones del sistema",
    rec_sections: (r) => `Secciones para grabar · ${r}`,
    region_empty_title: "Sin guiones para esta región",
    region_empty_lead: (r) => `Importa o crea las secciones para ${r}.`,
    home_region_label: "Idioma y región de los guiones",
    home_region_hint: "Define la variante que leerá el actor. Es independiente del idioma de la app.",
    scenario_word: "Escenario",
    scenario_label: "Escenario (contexto)",
    step_word: "Paso",
    steps_n: (n) => `${n} ${n === 1 ? "paso" : "pasos"}`,
    f_scenario: "Escenario (contexto)",
    f_scenario_ph: "Describe el rol y la situación de la llamada…",
    f_steps: "Pasos",
    f_steps_ph: "1. Saluda y preséntate…\n2. Verifica la identidad…\n3. Resuelve y cierra…",
    f_steps_help: "Un paso por línea. La numeración se añade sola.",
  },
  en: {
    _name: "English",
    tagline: "Teleprompter for voice sessions",
    home_eyebrow: "Script studio · Voice actors",
    home_title: "Guide recording\nsessions with a\nclear teleprompter.",
    home_lead: "Choose the interface language, manage your scripts and phrases, and present them on screen for the voice actor. No recording — guided reading only.",
    home_applang: "Application language",
    home_applang_hint: "Does not affect the scripts. Each engineer can work in their own language.",
    home_enter: "Enter the library",
    home_import: "Import JSON",
    hub_eyebrow: "Script library",
    hub_title: "Sections and phrases",
    hub_lead: "Add, edit or import scripts. Open any section as a teleprompter for the session.",
    hub_new_section: "New section",
    hub_import: "Import JSON",
    hub_export: "Export JSON",
    hub_open: "Open teleprompter",
    hub_manage: "Manage",
    hub_add_item: "Add item",
    hub_empty_title: "Your library is empty",
    hub_empty_lead: "Create a section or import a JSON to get started.",
    hub_sections_count: (n) => `${n} ${n === 1 ? "section" : "sections"}`,
    kind_phrases: "Phrases",
    kind_scripts: "Scripts",
    kind_phrases_desc: "Short lines, with optional emotion.",
    kind_scripts_desc: "Long texts for continuous reading.",
    items_word: (n) => `${n} ${n === 1 ? "item" : "items"}`,
    lang_label: "Language",
    m_new_item: "New item",
    m_edit_item: "Edit item",
    m_new_section: "New section",
    m_edit_section: "Edit section",
    f_item_title: "Title (optional)",
    f_item_text: "Text",
    f_item_emotion: "Emotion (optional)",
    f_emotion_ph: "e.g. Enthusiastic",
    f_section_name: "Section name",
    f_section_hint: "Hint (optional)",
    f_section_type: "Type",
    save: "Save",
    cancel: "Cancel",
    del: "Delete",
    del_section_q: "Delete this section and all its items?",
    del_item_q: "Delete this item?",
    text_required: "Text cannot be empty.",
    name_required: "Name cannot be empty.",
    imp_title: "Import scripts (JSON)",
    imp_desc: "Upload a .json file or paste the content. It must follow the template format.",
    imp_choose: "Choose file",
    imp_paste: "…or paste the JSON here",
    imp_mode: "On import",
    imp_replace: "Replace library",
    imp_append: "Add to library",
    imp_do: "Import",
    imp_template: "Download template",
    imp_ok: (n) => `Imported: ${n} ${n === 1 ? "section" : "sections"}`,
    imp_err: "Invalid JSON or wrong format.",
    tp_back: "Library",
    tp_prev: "Previous",
    tp_next: "Next",
    tp_of: "of",
    tp_sections: "Sections",
    tp_font: "Size",
    tp_autoscroll: "Autoscroll",
    tp_covered: "Covered",
    tp_mark: "Mark covered",
    tp_empty: "This section has no items yet.",
    tp_add_first: "Add the first one",
    tp_edit: "Edit",
    toast_exported: "Library exported",
    toast_saved: "Changes saved",
    covered_of: (a, b) => `${a}/${b} covered`,
    nav_welcome: "Home",
    sys_lang_menu: "Application language (system)",
    script_region_menu: "Script language & region",
    instr_title: "System instructions",
    instr_desc: "Independent from the recording sections.",
    instr_read: "Read",
    instr_edit: "Edit",
    instr_modal: "Edit system instructions",
    rec_sections: (r) => `Recording sections · ${r}`,
    region_empty_title: "No scripts for this region",
    region_empty_lead: (r) => `Import or create the sections for ${r}.`,
    home_region_label: "Script language & region",
    home_region_hint: "Defines the variant the actor will read. Independent from the app language.",
    scenario_word: "Scenario",
    scenario_label: "Scenario (context)",
    step_word: "Step",
    steps_n: (n) => `${n} ${n === 1 ? "step" : "steps"}`,
    f_scenario: "Scenario (context)",
    f_scenario_ph: "Describe the role and the call situation…",
    f_steps: "Steps",
    f_steps_ph: "1. Greet and introduce yourself…\n2. Verify identity…\n3. Resolve and close…",
    f_steps_help: "One step per line. Numbering is added automatically.",
  },
  de: {
    _name: "Deutsch",
    tagline: "Teleprompter für Sprachaufnahmen",
    home_eyebrow: "Skript-Studio · Sprecher",
    home_title: "Führe Aufnahme-\nSessions mit einem\nklaren Teleprompter.",
    home_lead: "Wähle die Oberflächensprache, verwalte deine Skripte und Sätze und zeige sie dem Sprecher auf dem Bildschirm. Keine Aufnahme – nur geführtes Lesen.",
    home_applang: "Anwendungssprache",
    home_applang_hint: "Beeinflusst die Skripte nicht. Jeder Techniker kann in seiner Sprache arbeiten.",
    home_enter: "Zur Bibliothek",
    home_import: "JSON importieren",
    hub_eyebrow: "Skript-Bibliothek",
    hub_title: "Abschnitte und Sätze",
    hub_lead: "Skripte hinzufügen, bearbeiten oder importieren. Öffne jeden Abschnitt als Teleprompter für die Session.",
    hub_new_section: "Neuer Abschnitt",
    hub_import: "JSON importieren",
    hub_export: "JSON exportieren",
    hub_open: "Teleprompter öffnen",
    hub_manage: "Verwalten",
    hub_add_item: "Element hinzufügen",
    hub_empty_title: "Deine Bibliothek ist leer",
    hub_empty_lead: "Erstelle einen Abschnitt oder importiere ein JSON, um zu beginnen.",
    hub_sections_count: (n) => `${n} ${n === 1 ? "Abschnitt" : "Abschnitte"}`,
    kind_phrases: "Sätze",
    kind_scripts: "Skripte",
    kind_phrases_desc: "Kurze Zeilen, mit optionaler Emotion.",
    kind_scripts_desc: "Lange Texte zum fortlaufenden Lesen.",
    items_word: (n) => `${n} ${n === 1 ? "Element" : "Elemente"}`,
    lang_label: "Sprache",
    m_new_item: "Neues Element",
    m_edit_item: "Element bearbeiten",
    m_new_section: "Neuer Abschnitt",
    m_edit_section: "Abschnitt bearbeiten",
    f_item_title: "Titel (optional)",
    f_item_text: "Text",
    f_item_emotion: "Emotion (optional)",
    f_emotion_ph: "z. B. Begeistert",
    f_section_name: "Abschnittsname",
    f_section_hint: "Hinweis (optional)",
    f_section_type: "Typ",
    save: "Speichern",
    cancel: "Abbrechen",
    del: "Löschen",
    del_section_q: "Diesen Abschnitt und alle Elemente löschen?",
    del_item_q: "Dieses Element löschen?",
    text_required: "Text darf nicht leer sein.",
    name_required: "Name darf nicht leer sein.",
    imp_title: "Skripte importieren (JSON)",
    imp_desc: "Lade eine .json-Datei hoch oder füge den Inhalt ein. Es muss dem Vorlagenformat entsprechen.",
    imp_choose: "Datei wählen",
    imp_paste: "…oder füge das JSON hier ein",
    imp_mode: "Beim Import",
    imp_replace: "Bibliothek ersetzen",
    imp_append: "Zur Bibliothek hinzufügen",
    imp_do: "Importieren",
    imp_template: "Vorlage herunterladen",
    imp_ok: (n) => `Importiert: ${n} ${n === 1 ? "Abschnitt" : "Abschnitte"}`,
    imp_err: "Ungültiges JSON oder falsches Format.",
    tp_back: "Bibliothek",
    tp_prev: "Zurück",
    tp_next: "Weiter",
    tp_of: "von",
    tp_sections: "Abschnitte",
    tp_font: "Größe",
    tp_autoscroll: "Autoscroll",
    tp_covered: "Erledigt",
    tp_mark: "Als erledigt markieren",
    tp_empty: "Dieser Abschnitt hat noch keine Elemente.",
    tp_add_first: "Erstes hinzufügen",
    tp_edit: "Bearbeiten",
    toast_exported: "Bibliothek exportiert",
    toast_saved: "Änderungen gespeichert",
    covered_of: (a, b) => `${a}/${b} erledigt`,
    nav_welcome: "Start",
    sys_lang_menu: "Anwendungssprache (System)",
    script_region_menu: "Skriptsprache & Region",
    instr_title: "System-Anweisungen",
    instr_desc: "Unabhängig von den Aufnahme-Abschnitten.",
    instr_read: "Lesen",
    instr_edit: "Bearbeiten",
    instr_modal: "System-Anweisungen bearbeiten",
    rec_sections: (r) => `Aufnahme-Abschnitte · ${r}`,
    region_empty_title: "Keine Skripte für diese Region",
    region_empty_lead: (r) => `Importiere oder erstelle die Abschnitte für ${r}.`,
    home_region_label: "Skriptsprache & Region",
    home_region_hint: "Legt die Variante fest, die der Sprecher liest. Unabhängig von der App-Sprache.",
    scenario_word: "Szenario",
    scenario_label: "Szenario (Kontext)",
    step_word: "Schritt",
    steps_n: (n) => `${n} ${n === 1 ? "Schritt" : "Schritte"}`,
    f_scenario: "Szenario (Kontext)",
    f_scenario_ph: "Beschreibe die Rolle und die Gesprächssituation…",
    f_steps: "Schritte",
    f_steps_ph: "1. Begrüße und stelle dich vor…\n2. Identität prüfen…\n3. Lösen und abschließen…",
    f_steps_help: "Ein Schritt pro Zeile. Nummerierung wird automatisch ergänzt.",
  },
};
const LANGS = [
  { code: "es", flag: "🇪🇸", label: "Español" },
  { code: "en", flag: "🇺🇸", label: "English" },
  { code: "de", flag: "🇩🇪", label: "Deutsch" },
];
// Script locale (language + country/region) — INDEPENDENT from the UI language.
const SCRIPT_LOCALES = [
  { code: "es-ES", flag: "🇪🇸", lang: "Español", region: "España" },
  { code: "es-MX", flag: "🇲🇽", lang: "Español", region: "México" },
  { code: "es-419", flag: "🌎", lang: "Español", region: "Latinoamérica" },
  { code: "es-AR", flag: "🇦🇷", lang: "Español", region: "Argentina" },
  { code: "en-US", flag: "🇺🇸", lang: "English", region: "United States" },
  { code: "de-DE", flag: "🇩🇪", lang: "Deutsch", region: "Deutschland" },
  { code: "ca-ES", flag: "🏴󠁥󠁳󠁣󠁴󠁿", lang: "Català", region: "Catalunya" },
];
const localeInfo = (code) => SCRIPT_LOCALES.find(l => l.code === code) || SCRIPT_LOCALES[0];

/* ---------------- emotion → emoji + color (label = raw content) ----- */
const EMO = [
  { k: ["emocionado", "emocionat", "excited", "begeistert", "entusiasta", "enthusiastic", "alegría genuina", "alegria genuina", "alegria genuïna", "happy", "fröhlich", "freudig", "echte freude", "genuine joy", "entusiasta/inquisitivo", "enthusiastic_inquisitive"], e: "🤩", c: "#c9501e" },
  { k: ["sorpresa encantada", "sorpresa encantada", "delighted surprise", "angenehme überraschung", "surprised", "überrascht", "sorpresa"], e: "😮", c: "#7370ff" },
  { k: ["decepcionado", "decebut", "disappointed", "enttäuscht"], e: "😞", c: "#636363" },
  { k: ["triste", "trist", "sad", "traurig", "sad resignation", "amargura", "bitter"], e: "😔", c: "#4e4e56" },
  { k: ["enojado", "enfadat", "angry", "wütend", "exasperado", "exasperat", "exasperated", "genervt"], e: "😠", c: "#b3401a" },
  { k: ["juguetón", "jugueton", "juganer", "playful", "verspielt"], e: "😜", c: "#818cf8" },
  { k: ["nervioso", "nerviós", "nervous", "nervös"], e: "😅", c: "#c9501e" },
  { k: ["culpable", "guilty", "schuldig"], e: "😳", c: "#a15a3a" },
  { k: ["alivio", "alleujament", "relieved", "relief", "erleichtert", "erleichterung"], e: "😌", c: "#5c8a72" },
  { k: ["satisfacción engreída", "satisfaccion engreida", "presumit", "smug", "selbstgefällig"], e: "😏", c: "#5754ff" },
  { k: ["incierto", "incert", "uncertain", "unsicher", "unsure"], e: "🤔", c: "#7d7d7d" },
  { k: ["genuinamente sin molestias", "unbothered"], e: "🙂", c: "#5c8a72" },
  { k: ["tranquilidad calmada", "tranquilizador", "tranquil·litzador", "reassuring", "beruhigend", "calm", "tranquilo y empático", "tranquilo y empatico"], e: "🫶", c: "#5c8a72" },
  { k: ["comprensivo", "comprensiu", "understanding", "verständnisvoll", "empático", "empatico", "empàtic", "empathetic", "einfühlsam"], e: "💙", c: "#225e84" },
  { k: ["inquisitivo", "inquisitiu", "inquisitive", "neugierig", "curious", "curioso", "seguro/inquisitivo", "servicial/inquisitivo", "confident_inquisitive", "helpful_inquisitive"], e: "🧐", c: "#4186ff" },
  { k: ["preocupado", "preocupat", "concerned", "besorgt", "worried"], e: "😟", c: "#c9501e" },
  { k: ["seguro", "segur", "confident", "sicher"], e: "😎", c: "#225e84" },
  { k: ["servicial", "helpful", "hilfsbereit"], e: "🙋", c: "#4186ff" },
  { k: ["amigable y casual", "amigable", "friendly", "freundlich", "amistós"], e: "😊", c: "#5c8a72" },
  { k: ["claro e instructivo", "instructive", "instruktiv"], e: "📋", c: "#4e4e56" },
  { k: ["neutral/profesional", "neutral", "neutre", "professional", "profesional"], e: "💼", c: "#636363" },
];
function emoMeta(raw) {
  if (!raw) return null;
  const s = String(raw).toLowerCase().trim();
  for (const row of EMO) if (row.k.some(k => s === k)) return row;
  for (const row of EMO) if (row.k.some(k => s.includes(k))) return row;
  return { e: "🎭", c: "#636363" };
}
const EMO_SUGGEST = ["Entusiasta", "Empático", "Neutral", "Preocupado", "Tranquilizador", "Seguro", "Inquisitivo", "Alegría genuina", "Triste", "Enojado", "Juguetón", "Nervioso", "Alivio", "Incierto"];

/* ---------------- seed content from bundled DATA ------------------- */
let _uid = 0;
const uid = (p) => `${p}_${Date.now().toString(36)}_${(_uid++).toString(36)}`;
function seedSections() {
  const mkItems = (items) => (items || []).map(it => it.steps
    ? { id: uid("it"), title: it.title || "", scenario: it.scenario || "", steps: it.steps.slice(), emotion: it.emotion || "" }
    : { id: uid("it"), title: it.title || "", text: it.text || "", emotion: it.emotion || "" });
  const S = (DATA.sections || []).map(s => ({
    id: uid("sec"), title: s.title, kind: s.kind || "phrases", hint: s.hint || "", items: mkItems(s.items),
  }));
  // Number booth (kept as editable phrases; not part of the corpus sheet)
  S.push({ id: uid("sec"), title: "Números · individuales", kind: "phrases", hint: "Dígitos claros y separados.", items: mkItems([
    { text: "Uno por uno: cero, uno, dos, tres, cuatro, cinco, seis, siete, ocho, nueve." },
    { text: "En orden inverso: nueve, ocho, siete, seis, cinco, cuatro, tres, dos, uno, cero." },
    { text: "Dígito a dígito: seis, cuatro, dos — ocho, uno, nueve — cero, tres, cinco." },
    { text: "Confirma el código dígito a dígito: siete, siete, dos, tres." },
  ]) });
  S.push({ id: uid("sec"), title: "Números · en conjunto", kind: "phrases", hint: "Números dentro de frases reales.", items: mkItems([
    { text: "El total del reembolso es de ciento cincuenta y cuatro euros con cuarenta y nueve céntimos." },
    { text: "Su cita es a las ocho y media de la mañana." },
    { text: "Su número de caso es el dos, cero, dos — cero, cero, nueve — cuatro, dos, uno." },
    { text: "El plazo es el quince de septiembre de dos mil veinticuatro." },
  ]) });
  return S;
}

/* ---- Spanish regional adaptation (idioms + variables per accent) --- */
const ES_LOCALE = {
  "es-MX": {
    sym: { "€": "$" },
    pairs: [
      ["euros", "pesos"], ["euro", "peso"], ["céntimos", "centavos"], ["céntimo", "centavo"],
      ["ordenador", "computadora"], ["ordenadores", "computadoras"], ["móvil", "celular"], ["coche", "auto"],
      ["conducir", "manejar"], ["aparcar", "estacionar"], ["piso", "departamento"], ["gafas", "lentes"],
      ["nevera", "refrigerador"], ["frigorífico", "refrigerador"], ["zumo", "jugo"], ["billete", "boleto"],
      [" vale,", " de acuerdo,"], ["patatas", "papas"], ["ordenador portátil", "laptop"],
      ["Glovo", "Rappi"], ["El Corte Inglés", "Liverpool"], ["Iberia", "Aeroméxico"], ["Movistar", "Telcel"],
      ["Iberdrola", "CFE"], ["Banco Sabadell", "Banorte"], ["CaixaBank", "Banorte"], ["VivaGym", "Smart Fit"],
    ],
  },
  "es-419": {
    sym: { "€": "$" },
    pairs: [
      ["euros", "dólares"], ["euro", "dólar"], ["céntimos", "centavos"], ["céntimo", "centavo"],
      ["ordenador", "computador"], ["ordenadores", "computadores"], ["móvil", "celular"], ["coche", "carro"],
      ["conducir", "manejar"], ["aparcar", "estacionar"], ["piso", "apartamento"], ["gafas", "lentes"],
      ["nevera", "refrigeradora"], ["frigorífico", "refrigeradora"], ["zumo", "jugo"], ["billete", "tiquete"],
      ["patatas", "papas"], ["Glovo", "Rappi"], ["El Corte Inglés", "Falabella"], ["Iberia", "LATAM"],
      ["Movistar", "Movistar"], ["Banco Sabadell", "Bancolombia"], ["CaixaBank", "Bancolombia"],
    ],
  },
  "es-AR": {
    sym: { "€": "$" },
    pairs: [
      ["euros", "pesos"], ["euro", "peso"], ["céntimos", "centavos"], ["céntimo", "centavo"],
      ["ordenador", "computadora"], ["ordenadores", "computadoras"], ["móvil", "celular"], ["coche", "auto"],
      ["conducir", "manejar"], ["aparcar", "estacionar"], ["piso", "departamento"], ["gafas", "anteojos"],
      ["nevera", "heladera"], ["frigorífico", "heladera"], ["zumo", "jugo"], ["billete", "pasaje"],
      ["patatas", "papas"], ["ordenador portátil", "notebook"],
      ["Glovo", "PedidosYa"], ["El Corte Inglés", "Falabella"], ["Iberia", "Aerolíneas Argentinas"],
      ["Movistar", "Personal"], ["Iberdrola", "Edenor"], ["Banco Sabadell", "Banco Galicia"], ["CaixaBank", "Banco Galicia"],
    ],
  },
};
const _escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const _matchCase = (src, repl) => (src[0] === src[0].toUpperCase() && src[0] !== src[0].toLowerCase())
  ? repl.charAt(0).toUpperCase() + repl.slice(1) : repl;
function reptext(text, pairs, symbols) {
  let out = text || "";
  for (const k in (symbols || {})) out = out.split(k).join(symbols[k]);
  for (const [from, to] of pairs) {
    let re;
    try { re = new RegExp("(?<![\\p{L}\\p{N}])(" + _escapeRe(from) + ")(?![\\p{L}\\p{N}])", "giu"); }
    catch (e) { re = new RegExp("\\b(" + _escapeRe(from) + ")\\b", "gi"); }
    out = out.replace(re, (m) => _matchCase(m, to));
  }
  return out;
}
function deriveEs(sections, code) {
  const loc = ES_LOCALE[code];
  if (!loc) return sections;
  const pairs = [...loc.pairs].sort((a, b) => b[0].length - a[0].length);
  const conv = (s) => reptext(s, pairs, loc.sym);
  return sections.map(s => ({
    ...s, title: conv(s.title), hint: conv(s.hint || ""),
    items: s.items.map(it => it.steps
      ? { ...it, title: conv(it.title || ""), scenario: conv(it.scenario || ""), steps: (it.steps || []).map(conv) }
      : { ...it, title: conv(it.title || ""), text: conv(it.text || "") }),
  }));
}

/* ---- library resolver per script locale (cached for stable ids) --- */
const _libCache = {};
function baseLibraryFor(code) {
  if (_libCache[code]) return _libCache[code];
  let lib;
  if (code === "es-ES") lib = seedSections();
  else if (ES_LOCALE[code]) lib = deriveEs(seedSections(), code);
  else if (typeof EXTRA_LIBS !== "undefined" && EXTRA_LIBS[code]) {
    lib = EXTRA_LIBS[code].map(s => ({
      id: uid("sec"), title: s.title, kind: s.kind, hint: s.hint || "",
      items: (s.items || []).map(it => it.steps
        ? { id: uid("it"), title: it.title || "", scenario: it.scenario || "", steps: it.steps.slice(), emotion: it.emotion || "" }
        : { id: uid("it"), title: it.title || "", text: it.text, emotion: it.emotion || "" }),
    }));
  } else lib = [];
  _libCache[code] = lib;
  return lib;
}

/* ---------------- import / export helpers -------------------------- */
function parseScriptText(text) {
  const raw = String(text || "").replace(/\[[^\]]*\]/g, "");
  const m = raw.match(/\n\s*\n\s*1\.\s/);
  let scenario = raw, block = "";
  if (m) { scenario = raw.slice(0, m.index); block = raw.slice(m.index); }
  scenario = scenario.replace(/^\s*Escenario\s*:\s*/i, "").trim();
  const steps = block
    ? block.trim().split(/\n\s*\n(?=\s*\d+\.\s)/).map(p => p.replace(/^\s*\d+\.\s*/, "").trim()).filter(Boolean)
    : [];
  return { scenario, steps };
}
function normalizeImported(raw) {
  let sections = Array.isArray(raw) ? raw : (raw && Array.isArray(raw.sections) ? raw.sections : null);
  if (!sections) throw new Error("no sections");
  return sections.map(sec => {
    if (!sec || !Array.isArray(sec.items)) throw new Error("bad section");
    const kind = sec.kind === "scripts" ? "scripts" : "phrases";
    const items = sec.items.map(it => {
      it = it || {};
      if (kind === "scripts") {
        let scenario = it.scenario;
        let steps = Array.isArray(it.steps) ? it.steps.map(s => String(s)) : null;
        if (steps == null || scenario == null) {
          const parsed = parseScriptText(it.text != null ? it.text : (scenario || ""));
          scenario = scenario != null ? String(scenario) : parsed.scenario;
          steps = steps != null ? steps : parsed.steps;
        }
        return { id: uid("it"), title: String(it.title || ""), scenario: String(scenario || ""), steps: (steps || []).filter(s => s.trim()), emotion: String(it.emotion || "") };
      }
      return { id: uid("it"), title: String(it.title || ""), text: String(it.text || ""), emotion: String(it.emotion || "") };
    }).filter(it => it.steps ? (it.scenario.trim() || it.steps.length) : it.text.trim());
    return { id: uid("sec"), title: String(sec.title || "Sección"), kind, hint: String(sec.hint || ""), items };
  });
}
function exportBlob(content) {
  const out = {
    name: "Decagon scripts",
    exportedAt: new Date().toISOString(),
    sections: content.map(s => ({
      title: s.title, kind: s.kind, hint: s.hint,
      items: s.items.map(it => it.steps
        ? { title: it.title, scenario: it.scenario, steps: it.steps, emotion: it.emotion || "" }
        : { title: it.title, text: it.text, emotion: it.emotion }),
    })),
  };
  return new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
}
const TEMPLATE = {
  name: "Mi set de guiones",
  sections: [
    { title: "Frases expresivas", kind: "phrases", hint: "Lee con naturalidad.", items: [
      { title: "", text: "Hola, ¿en qué puedo ayudarle hoy?", emotion: "Amigable" },
      { title: "", text: "¡No me lo puedo creer!", emotion: "Emocionado" },
    ]},
    { title: "Guiones · CSR", kind: "scripts", hint: "Escenario + pasos. El actor avanza paso a paso.", items: [
      { title: "Escenario 1 · Pedido retrasado", scenario: "Eres un agente de atención al cliente. El cliente llama por un pedido retrasado.", steps: [
        "Saluda y preséntate; pide el nombre o el correo de la cuenta.",
        "Abre la cuenta y confirma el motivo de la llamada.",
        "Revisa el seguimiento, explica el retraso, discúlpate y ofrece el enlace.",
        "Confirma la solución y el número de caso; cierra con amabilidad."
      ]},
    ]},
  ],
};

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/* =================== small atoms =================================== */
function DecagonMark({ size = 26 }) {
  const pts = Array.from({ length: 10 }, (_, i) => {
    const a = (Math.PI * 2 * i) / 10 - Math.PI / 2;
    return `${50 + 44 * Math.cos(a)},${50 + 44 * Math.sin(a)}`;
  }).join(" ");
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="dmark">
      <polygon points={pts} fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
      <circle cx="50" cy="50" r="11" fill="#5754ff" />
    </svg>
  );
}
function Logo({ className = "" }) {
  return <img src={LOGO} alt="Decagon" className={`logo ${className}`} draggable="false" />;
}
function LangPicker({ lang, setLang, size = "md", dir = "horizontal" }) {
  return (
    <div className={`seg lang-seg ${size} ${dir === "vertical" ? "vertical" : ""}`}>
      {LANGS.map(l => (
        <button key={l.code} className={`seg-btn ${lang === l.code ? "on" : ""}`} onClick={() => setLang(l.code)}>
          <span className="seg-flag">{l.flag}</span>{l.label}
        </button>
      ))}
    </div>
  );
}
function KindBadge({ kind, t }) {
  const isScript = kind === "scripts";
  return <span className={`kind ${isScript ? "scripts" : "phrases"}`}>{isScript ? <FileText size={12} /> : <MessageSquare size={12} />}{isScript ? t.kind_scripts : t.kind_phrases}</span>;
}
function EmotionBadge({ raw }) {
  const m = emoMeta(raw);
  if (!m) return null;
  return <div className="emo" style={{ "--emo": m.c }}><span>{m.e}</span><em>{raw}</em></div>;
}
function Ring({ pct = 0, size = 30, stroke = 3, color = "#5754ff" }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c * (1 - pct)} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dashoffset .4s ease" }} />
    </svg>
  );
}

/* =================== HOME =========================================== */
function Home({ t, lang, setLang, locale, setLocale, onEnter, onImport }) {
  return (
    <div className="screen dark home">
      <div className="wrap narrow">
        <div className="brand-row fade-up"><Logo className="lg" /> <span className="brand-sub">VA Teleprompter</span></div>
        <div className="eyebrow indigo fade-up d1">{t.home_eyebrow}</div>
        <h1 className="hero fade-up d1">{t.home_title.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</h1>
        <p className="lead fade-up d2">{t.home_lead}</p>

        <div className="home-cfg fade-up d3">
          <div className="applang">
            <div className="applang-head"><Languages size={16} /> {t.home_applang}</div>
            <LangPicker lang={lang} setLang={setLang} size="lg" dir="vertical" />
            <div className="applang-hint">{t.home_applang_hint}</div>
          </div>
          <div className="applang region-block">
            <div className="applang-head"><Globe size={16} /> {t.home_region_label}</div>
            <div className="region-pills">
              {SCRIPT_LOCALES.map(l => (
                <button key={l.code} className={`rpill ${locale === l.code ? "on" : ""}`} onClick={() => setLocale(l.code)}>
                  <span className="rflag">{l.flag}</span> {l.lang} · {l.region}
                </button>
              ))}
            </div>
            <div className="applang-hint">{t.home_region_hint}</div>
          </div>
        </div>

        <div className="home-cta fade-up d3">
          <button className="btn primary lg" onClick={onEnter}>{t.home_enter} <ArrowRight size={18} /></button>
          <button className="btn ghost lg" onClick={onImport}><Upload size={17} /> {t.home_import}</button>
        </div>
      </div>
      <div className="ambient" aria-hidden>{[0, 1, 2, 3].map(i => <span key={i} className="aring" style={{ animationDelay: `${i * 0.9}s`, width: `${180 + i * 150}px`, height: `${180 + i * 150}px` }} />)}</div>
    </div>
  );
}

/* =================== TOP BAR ======================================= */
function Dropdown({ icon, caption, current, options, onSelect }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="dd">
      <button className={`dd-btn ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
        {icon}<span className="dd-cur">{current}</span><ChevronDown size={13} className={`dd-ch ${open ? "up" : ""}`} />
      </button>
      {open && (
        <>
          <div className="dd-back" onClick={() => setOpen(false)} />
          <div className="dd-menu">
            <div className="dd-cap">{caption}</div>
            {options.map(o => (
              <button key={o.code} className={`dd-item ${o.on ? "on" : ""}`} onClick={() => { onSelect(o.code); setOpen(false); }}>
                {o.flag && <span className="dd-flag">{o.flag}</span>}
                <span className="dd-main">{o.main}</span>
                {o.on && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function TopBar({ t, lang, setLang, locale, setLocale, onWelcome, onBack, right }) {
  const li = localeInfo(locale);
  const ll = LANGS.find(l => l.code === lang) || LANGS[0];
  return (
    <div className="topbar">
      <div className="wrap topbar-in">
        <div className="tb-left">
          {onBack
            ? <button className="tb-back" onClick={onBack}><ArrowLeft size={16} /> {t.tp_back}</button>
            : <button className="brand-btn" onClick={onWelcome}><Logo /> <span className="brand-sub">VA Teleprompter</span></button>}
        </div>
        <div className="tb-right">
          {right}
          <Dropdown icon={<Languages size={15} />} caption={t.sys_lang_menu}
            current={<><span className="dd-flag">{ll.flag}</span>{lang.toUpperCase()}</>}
            options={LANGS.map(l => ({ code: l.code, flag: l.flag, main: l.label, on: l.code === lang }))}
            onSelect={setLang} />
          <Dropdown icon={<Globe size={15} />} caption={t.script_region_menu}
            current={<><span className="dd-flag">{li.flag}</span>{li.code}</>}
            options={SCRIPT_LOCALES.map(l => ({ code: l.code, flag: l.flag, main: `${l.lang} · ${l.region}`, on: l.code === locale }))}
            onSelect={setLocale} />
          <button className="tb-home" onClick={onWelcome} title={t.nav_welcome}><HomeIcon size={17} /></button>
        </div>
      </div>
    </div>
  );
}

/* =================== HUB / LIBRARY ================================= */
function Hub({ t, lang, setLang, locale, setLocale, onWelcome, content, covered, instructions, onReadInstr, onEditInstr, onOpen, onNewSection, onEditSection, onDeleteSection, onAddItem, onEditItem, onDeleteItem, onImport, onExport }) {
  const [openId, setOpenId] = useState(content[0] ? content[0].id : null);
  const li = localeInfo(locale);
  return (
    <div className="screen light">
      <TopBar t={t} lang={lang} setLang={setLang} locale={locale} setLocale={setLocale} onWelcome={onWelcome} />
      <div className="wrap pad-top">
        <div className="hub-head">
          <div>
            <div className="eyebrow indigo">{t.hub_eyebrow}</div>
            <h2 className="h2">{t.hub_title}</h2>
            <p className="lead dim" style={{ maxWidth: 620 }}>{t.hub_lead}</p>
          </div>
          <div className="hub-actions">
            <button className="btn outline" onClick={onImport}><Upload size={16} /> {t.hub_import}</button>
            <button className="btn outline" onClick={onExport}><Download size={16} /> {t.hub_export}</button>
            <button className="btn primary" onClick={onNewSection}><FolderPlus size={16} /> {t.hub_new_section}</button>
          </div>
        </div>

        <div className="instr-card">
          <span className="instr-ic"><Info size={18} /></span>
          <div className="instr-main">
            <b>{t.instr_title}</b>
            <span>{t.instr_desc}</span>
          </div>
          <div className="instr-acts">
            <button className="btn outline sm" onClick={onReadInstr}><Eye size={15} /> {t.instr_read}</button>
            <button className="btn ghost sm" onClick={onEditInstr}><Pencil size={15} /> {t.instr_edit}</button>
          </div>
        </div>

        <div className="rec-head">
          <span className="rec-title"><MapPin size={15} /> {t.rec_sections(`${li.flag} ${li.lang} · ${li.region}`)}</span>
          <span className="rec-sub">{t.hub_sections_count(content.length)}</span>
        </div>

        {content.length === 0 ? (
          <div className="empty">
            <BookOpen size={30} />
            <b>{t.region_empty_title}</b>
            <p>{t.region_empty_lead(`${li.lang} · ${li.region}`)}</p>
            <div className="empty-cta">
              <button className="btn primary" onClick={onNewSection}><Plus size={16} /> {t.hub_new_section}</button>
              <button className="btn outline" onClick={onImport}><Upload size={16} /> {t.hub_import}</button>
            </div>
          </div>
        ) : (
          <div className="stage-list">
            {content.map(sec => {
              const isOpen = openId === sec.id;
              const total = sec.items.length;
              const done = sec.items.filter(it => covered[it.id]).length;
              const tint = sec.kind === "scripts" ? "#225e84" : "#5754ff";
              return (
                <div key={sec.id} className={`stage-card ${isOpen ? "open" : ""}`} style={{ "--tint": tint }}>
                  <div className="stage-main">
                    <button className="stage-open" onClick={() => setOpenId(isOpen ? null : sec.id)}>
                      <span className="stage-ic">{sec.kind === "scripts" ? <FileText size={19} /> : <MessageSquare size={19} />}</span>
                      <span className="stage-txt">
                        <b>{sec.title} <KindBadge kind={sec.kind} t={t} /></b>
                        <span>{sec.hint || t.items_word(total)}</span>
                      </span>
                    </button>
                    <span className="stage-meta">
                      {total > 0 && <span className="prog"><Ring pct={total ? done / total : 0} color={done === total ? "#5c8a72" : tint} /><em>{done}/{total}</em></span>}
                      <button className="icon-btn play" onClick={() => onOpen(sec.id)} title={t.hub_open}><Play size={16} /></button>
                      <button className="icon-btn" onClick={() => setOpenId(isOpen ? null : sec.id)}><ChevronDown size={18} className="chev" /></button>
                    </span>
                  </div>
                  {isOpen && (
                    <div className="items-panel">
                      <div className="items-tools">
                        <button className="btn outline sm" onClick={() => onOpen(sec.id)}><Eye size={15} /> {t.hub_open}</button>
                        <button className="btn ghost sm" onClick={() => onEditSection(sec)}><Pencil size={15} /> {t.hub_manage}</button>
                        <button className="btn ghost sm danger" onClick={() => onDeleteSection(sec)}><Trash2 size={15} /> {t.del}</button>
                        <button className="btn primary sm push" onClick={() => onAddItem(sec.id)}><Plus size={15} /> {t.hub_add_item}</button>
                      </div>
                      <div className="items-list">
                        {sec.items.map((it, i) => (
                          <div key={it.id} className="item-row">
                            <span className="item-n">{i + 1}</span>
                            <div className="item-body">
                              {it.title && <b>{it.title}</b>}
                              <span className="item-text">{it.steps ? (it.scenario || "") : it.text}</span>
                            </div>
                            {it.steps ? <span className="steps-badge"><ListChecks size={13} /> {t.steps_n(it.steps.length)}</span> : (it.emotion && <EmotionBadge raw={it.emotion} />)}
                            <div className="item-acts">
                              <button className="icon-btn" onClick={() => onEditItem(sec.id, it)} title={t.tp_edit}><Pencil size={14} /></button>
                              <button className="icon-btn danger" onClick={() => onDeleteItem(sec.id, it.id)} title={t.del}><Trash2 size={14} /></button>
                            </div>
                          </div>
                        ))}
                        {sec.items.length === 0 && <div className="items-empty">{t.tp_empty}</div>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* =================== TELEPROMPTER ================================== */
function Teleprompter({ t, lang, setLang, locale, setLocale, onWelcome, content, section, covered, onToggleCovered, onBack, onSwitch, onEditItem, onAddItem }) {
  const [idx, setIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);
  const [scale, setScale] = useState(1);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [ctxOpen, setCtxOpen] = useState(true);
  const items = section.items;
  const total = items.length;
  const isScript = section.kind === "scripts";
  const item = items[idx];
  const steps = isScript && item ? (item.steps || []) : [];
  const stepText = isScript ? (steps[stepIdx] || "") : (item ? item.text : "");
  const tint = isScript ? "#4186ff" : "#7370ff";
  const emo = item ? emoMeta(item.emotion) : null;
  const done = items.filter(it => covered[it.id]).length;

  useEffect(() => { setIdx(0); setStepIdx(0); setCtxOpen(true); }, [section.id]);

  const jumpScenario = (i) => { const n = Math.max(0, Math.min(total - 1, i)); setIdx(n); setStepIdx(0); };
  const advance = (d) => {
    if (!isScript) { setIdx(p => Math.max(0, Math.min(total - 1, p + d))); return; }
    let ni = idx, ns = stepIdx + d;
    const cur = items[idx].steps || [];
    if (ns < 0) { if (idx > 0) { ni = idx - 1; ns = Math.max(0, (items[ni].steps || []).length - 1); } else ns = 0; }
    else if (ns > cur.length - 1) { if (idx < total - 1) { ni = idx + 1; ns = 0; } else ns = Math.max(0, cur.length - 1); }
    setIdx(ni); setStepIdx(ns);
  };
  const prevDisabled = isScript ? (idx === 0 && stepIdx === 0) : idx === 0;
  const nextDisabled = isScript ? (idx === total - 1 && stepIdx >= steps.length - 1) : idx === total - 1;

  return (
    <div className="screen dark tele">
      <TopBar t={t} lang={lang} setLang={setLang} locale={locale} setLocale={setLocale} onWelcome={onWelcome} onBack={onBack}
        right={<span className="tb-cov">{t.covered_of(done, total)}</span>} />

      <div className="tele-bar">
        <div className="wrap tele-bar-in">
          <div className="tele-picker">
            <button className="picker-btn" onClick={() => setPickerOpen(o => !o)}>
              <ClipboardList size={15} /> {section.title} <ChevronDown size={15} />
            </button>
            {pickerOpen && (
              <>
                <div className="dd-back" onClick={() => setPickerOpen(false)} />
                <div className="picker-menu">
                  {content.map(s => (
                    <button key={s.id} className={`picker-item ${s.id === section.id ? "on" : ""}`}
                      onClick={() => { setPickerOpen(false); onSwitch(s.id); }}>
                      {s.kind === "scripts" ? <FileText size={14} /> : <MessageSquare size={14} />}
                      <span>{s.title}</span>
                      <em>{s.items.length}</em>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="tele-tools">
            <div className="fontctl">
              <button onClick={() => setScale(s => Math.max(0.7, +(s - 0.1).toFixed(2)))}><Minus size={14} /></button>
              <span><Type size={14} /> {Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(s => Math.min(2, +(s + 0.1).toFixed(2)))}><Plus size={14} /></button>
            </div>
          </div>
        </div>
      </div>

      <div className="tele-body">
        {total === 0 ? (
          <div className="tele-empty">
            <p>{t.tp_empty}</p>
            <button className="btn primary" onClick={() => onAddItem(section.id)}><Plus size={16} /> {t.tp_add_first}</button>
          </div>
        ) : (
          <>
            <div className="stage-crumbs">
              <span style={{ color: tint }}>{section.title}</span>
              <span className="crumb-count">
                {isScript ? <>{t.scenario_word} {idx + 1} {t.tp_of} {total}</> : <>{idx + 1} {t.tp_of} {total}</>}
              </span>
              {covered[item.id] && <span className="crumb-done"><CircleCheck size={13} /> {t.tp_covered}</span>}
            </div>

            {isScript && (
              <div className="scn-strip">
                <button className="scn-arrow" disabled={idx === 0} onClick={() => jumpScenario(idx - 1)}><ChevronLeft size={16} /></button>
                <button className="scn-title" onClick={() => onEditItem(section.id, item)} title={t.tp_edit}>
                  <FileText size={14} /> <span>{item.title || `${t.scenario_word} ${idx + 1}`}</span> <Pencil size={13} />
                </button>
                <button className="scn-arrow" disabled={idx === total - 1} onClick={() => jumpScenario(idx + 1)}><ChevronRight size={16} /></button>
              </div>
            )}

            {isScript && item.scenario && (
              <div className={`ctx-card ${ctxOpen ? "open" : ""}`}>
                <button className="ctx-head" onClick={() => setCtxOpen(o => !o)}>
                  <span className="ctx-label"><ClipboardList size={14} /> {t.scenario_label}</span>
                  <ChevronDown size={16} className={`chev ${ctxOpen ? "up" : ""}`} />
                </button>
                {ctxOpen && <p className="ctx-body" style={{ fontSize: `${15 * scale}px` }}>{item.scenario}</p>}
              </div>
            )}

            <div className="prompter" style={{ "--tint": tint }}>
              {emo && <div className="pr-emo" style={{ "--emo": emo.c }}><span>{emo.e}</span><em>{item.emotion}</em></div>}
              {!isScript && <button className="pr-edit" onClick={() => onEditItem(section.id, item)} title={t.tp_edit}><Pencil size={15} /></button>}
              {isScript ? (
                <>
                  <div className="pr-step-label">{t.step_word} {steps.length ? stepIdx + 1 : 0} / {steps.length}</div>
                  <p className="pr-phrase step" style={{ fontSize: `${30 * scale}px` }}>{stepText || t.tp_empty}</p>
                </>
              ) : (
                <>
                  {item.title && <div className="pr-title">{item.title}</div>}
                  <p className="pr-phrase" style={{ fontSize: `${34 * scale}px` }}>{item.text}</p>
                </>
              )}
            </div>

            <div className="tele-nav">
              <button className="navbtn" disabled={prevDisabled} onClick={() => advance(-1)}><ChevronLeft size={18} /> {t.tp_prev}</button>
              <button className={`cov-btn ${covered[item.id] ? "on" : ""}`} onClick={() => onToggleCovered(item.id)}>
                {covered[item.id] ? <><Check size={16} /> {t.tp_covered}</> : <>{t.tp_mark}</>}
              </button>
              <button className="navbtn" disabled={nextDisabled} onClick={() => advance(1)}>{t.tp_next} <ChevronRight size={18} /></button>
            </div>

            {isScript ? (
              <div className="dots">
                {steps.slice(0, 40).map((_, i) => (
                  <span key={i} className={`dot ${i < stepIdx ? "done" : ""} ${i === stepIdx ? "cur" : ""}`} onClick={() => setStepIdx(i)} />
                ))}
                {steps.length > 40 && <span className="more">+{steps.length - 40}</span>}
              </div>
            ) : (
              <div className="dots">
                {items.slice(0, 30).map((it, i) => (
                  <span key={i} className={`dot ${covered[it.id] ? "done" : ""} ${i === idx ? "cur" : ""}`} onClick={() => setIdx(i)} />
                ))}
                {total > 30 && <span className="more">+{total - 30}</span>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* =================== INSTRUCTIONS (system, independent) =========== */
function InstructionsView({ t, lang, setLang, locale, setLocale, instructions, onBack, onWelcome, onEdit }) {
  const [scale, setScale] = useState(1);
  return (
    <div className="screen dark tele">
      <TopBar t={t} lang={lang} setLang={setLang} locale={locale} setLocale={setLocale} onWelcome={onWelcome} onBack={onBack} />
      <div className="tele-bar"><div className="wrap tele-bar-in">
        <div className="picker-btn static"><Info size={15} /> {t.instr_title}</div>
        <div className="tele-tools">
          <div className="fontctl">
            <button onClick={() => setScale(s => Math.max(0.7, +(s - 0.1).toFixed(2)))}><Minus size={14} /></button>
            <span><Type size={14} /> {Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(2, +(s + 0.1).toFixed(2)))}><Plus size={14} /></button>
          </div>
          <button className="btn ghost sm" onClick={onEdit}><Pencil size={15} /> {t.instr_edit}</button>
        </div>
      </div></div>
      <div className="tele-body">
        <div className="stage-crumbs"><span style={{ color: "#5c8a72" }}>{t.instr_title}</span><span className="crumb-count">{t.instr_desc}</span></div>
        <div className="prompter" style={{ "--tint": "#5c8a72" }}>
          <div className="pr-scroll"><pre className="pr-script" style={{ fontSize: `${16 * scale}px` }}>{instructions}</pre></div>
        </div>
      </div>
    </div>
  );
}

/* =================== MODALS ======================================= */
function Modal({ title, onClose, children, footer, wide }) {
  return (
    <div className="overlay" onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={`modal ${wide ? "wide" : ""}`}>
        <div className="modal-head"><h3>{title}</h3><button className="icon-btn" onClick={onClose}><X size={18} /></button></div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
}

function ItemModal({ t, initial, sectionKind, onSave, onClose }) {
  const isScript = sectionKind === "scripts";
  const [title, setTitle] = useState(initial ? (initial.title || "") : "");
  const [text, setText] = useState(initial ? (initial.text || "") : "");
  const [scenario, setScenario] = useState(initial ? (initial.scenario || "") : "");
  const [stepsText, setStepsText] = useState(initial && initial.steps ? initial.steps.join("\n") : "");
  const [emotion, setEmotion] = useState(initial ? (initial.emotion || "") : "");
  const [err, setErr] = useState("");
  const save = () => {
    if (isScript) {
      const steps = stepsText.split("\n").map(s => s.replace(/^\s*\d+[.)]\s*/, "").trim()).filter(Boolean);
      if (!scenario.trim() && steps.length === 0) { setErr(t.text_required); return; }
      onSave({ title: title.trim(), scenario: scenario.trim(), steps, emotion: emotion.trim() });
    } else {
      if (!text.trim()) { setErr(t.text_required); return; }
      onSave({ title: title.trim(), text: text.trim(), emotion: emotion.trim() });
    }
  };
  return (
    <Modal wide={isScript} title={initial ? t.m_edit_item : t.m_new_item} onClose={onClose}
      footer={<><button className="btn ghost" onClick={onClose}>{t.cancel}</button><button className="btn primary" onClick={save}><Check size={16} /> {t.save}</button></>}>
      <div className="field">
        <label>{t.f_item_title}</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="—" />
      </div>
      {isScript ? (
        <>
          <div className="field">
            <label>{t.f_scenario}</label>
            <textarea rows={3} value={scenario} onChange={e => { setScenario(e.target.value); setErr(""); }} placeholder={t.f_scenario_ph} />
          </div>
          <div className="field">
            <label>{t.f_steps}</label>
            <textarea rows={9} className="mono" value={stepsText} onChange={e => { setStepsText(e.target.value); setErr(""); }} placeholder={t.f_steps_ph} />
            <span className="hint-line"><Info size={12} /> {t.f_steps_help}</span>
            {err && <span className="err">{err}</span>}
          </div>
        </>
      ) : (
        <div className="field">
          <label>{t.f_item_text}</label>
          <textarea rows={4} value={text} onChange={e => { setText(e.target.value); setErr(""); }} />
          {err && <span className="err">{err}</span>}
        </div>
      )}
      <div className="field">
        <label>{t.f_item_emotion}</label>
        <div className="emo-input">
          <input list="emolist" value={emotion} onChange={e => setEmotion(e.target.value)} placeholder={t.f_emotion_ph} />
          {emotion && <span className="emo-preview">{emoMeta(emotion).e}</span>}
        </div>
        <datalist id="emolist">{EMO_SUGGEST.map(x => <option key={x} value={x} />)}</datalist>
      </div>
    </Modal>
  );
}

function SectionModal({ t, initial, onSave, onClose }) {
  const [title, setTitle] = useState(initial ? initial.title : "");
  const [hint, setHint] = useState(initial ? initial.hint : "");
  const [kind, setKind] = useState(initial ? initial.kind : "phrases");
  const [err, setErr] = useState("");
  const save = () => {
    if (!title.trim()) { setErr(t.name_required); return; }
    onSave({ title: title.trim(), hint: hint.trim(), kind });
  };
  return (
    <Modal title={initial ? t.m_edit_section : t.m_new_section} onClose={onClose}
      footer={<><button className="btn ghost" onClick={onClose}>{t.cancel}</button><button className="btn primary" onClick={save}><Check size={16} /> {t.save}</button></>}>
      <div className="field">
        <label>{t.f_section_name}</label>
        <input value={title} onChange={e => { setTitle(e.target.value); setErr(""); }} placeholder="—" />
        {err && <span className="err">{err}</span>}
      </div>
      <div className="field">
        <label>{t.f_section_type}</label>
        <div className="kind-pick">
          <button className={`kind-opt ${kind === "phrases" ? "on" : ""}`} onClick={() => setKind("phrases")}>
            <MessageSquare size={16} /><b>{t.kind_phrases}</b><span>{t.kind_phrases_desc}</span>
          </button>
          <button className={`kind-opt ${kind === "scripts" ? "on" : ""}`} onClick={() => setKind("scripts")}>
            <FileText size={16} /><b>{t.kind_scripts}</b><span>{t.kind_scripts_desc}</span>
          </button>
        </div>
      </div>
      <div className="field">
        <label>{t.f_section_hint}</label>
        <input value={hint} onChange={e => setHint(e.target.value)} placeholder="—" />
      </div>
    </Modal>
  );
}

function InstructionsModal({ t, initial, onSave, onClose }) {
  const [text, setText] = useState(initial || "");
  return (
    <Modal wide title={t.instr_modal} onClose={onClose}
      footer={<><button className="btn ghost" onClick={onClose}>{t.cancel}</button><button className="btn primary" onClick={() => onSave(text)}><Check size={16} /> {t.save}</button></>}>
      <div className="field">
        <label>{t.instr_title}</label>
        <textarea rows={12} value={text} onChange={e => setText(e.target.value)} />
      </div>
    </Modal>
  );
}

function ImportModal({ t, onImport, onClose }) {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("append");
  const [err, setErr] = useState("");
  const [fileName, setFileName] = useState("");
  const fileRef = useRef(null);

  const pickFile = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setFileName(f.name);
    const r = new FileReader();
    r.onload = () => setText(String(r.result || ""));
    r.readAsText(f);
  };
  const doImport = () => {
    try {
      const parsed = JSON.parse(text);
      const sections = normalizeImported(parsed);
      onImport(sections, mode);
    } catch (e) { setErr(t.imp_err); }
  };
  return (
    <Modal wide title={t.imp_title} onClose={onClose}
      footer={<>
        <button className="btn ghost" onClick={() => downloadBlob(new Blob([JSON.stringify(TEMPLATE, null, 2)], { type: "application/json" }), "plantilla-decagon.json")}><Download size={15} /> {t.imp_template}</button>
        <span className="foot-push" />
        <button className="btn ghost" onClick={onClose}>{t.cancel}</button>
        <button className="btn primary" onClick={doImport} disabled={!text.trim()}><Upload size={16} /> {t.imp_do}</button>
      </>}>
      <p className="imp-desc">{t.imp_desc}</p>
      <div className="imp-file">
        <input ref={fileRef} type="file" accept="application/json,.json" onChange={pickFile} hidden />
        <button className="btn outline" onClick={() => fileRef.current && fileRef.current.click()}><Upload size={16} /> {t.imp_choose}</button>
        {fileName && <span className="imp-fname"><FileText size={14} /> {fileName}</span>}
      </div>
      <div className="field">
        <label>{t.imp_paste}</label>
        <textarea rows={8} className="mono" value={text} onChange={e => { setText(e.target.value); setErr(""); }} placeholder='{ "sections": [ { "title": "…", "kind": "phrases", "items": [ { "text": "…", "emotion": "…" } ] } ] }' />
        {err && <span className="err">{err}</span>}
      </div>
      <div className="field">
        <label>{t.imp_mode}</label>
        <div className="seg mode-seg">
          <button className={`seg-btn ${mode === "append" ? "on" : ""}`} onClick={() => setMode("append")}>{t.imp_append}</button>
          <button className={`seg-btn ${mode === "replace" ? "on" : ""}`} onClick={() => setMode("replace")}>{t.imp_replace}</button>
        </div>
      </div>
    </Modal>
  );
}

/* =================== ROOT ========================================= */
export default function App() {
  const [lang, setLang] = useState("es");          // UI / system language
  const [locale, setLocale] = useState("es-ES");   // script language + region (independent)
  const [route, setRoute] = useState("home");      // home | hub | tele | instructions
  const [libraries, setLibraries] = useState({}); // per-region libraries (lazy via baseLibraryFor)
  const [instructions, setInstructions] = useState(() => DATA.instructions);       // system instructions (independent)
  const [curSecId, setCurSecId] = useState(null);
  const [covered, setCovered] = useState({});
  const [toast, setToast] = useState(null);
  const [itemModal, setItemModal] = useState(null);
  const [sectionModal, setSectionModal] = useState(null);
  const [importOpen, setImportOpen] = useState(false);
  const [instrOpen, setInstrOpen] = useState(false);

  const t = I18N[lang];
  const showToast = (m) => { setToast(m); setTimeout(() => setToast(null), 2400); };

  const content = libraries[locale] || baseLibraryFor(locale);
  const curSection = content.find(s => s.id === curSecId) || null;

  // switching the script region swaps the whole section library; leave the reader if open
  const changeLocale = (code) => { setLocale(code); if (route === "tele") { setRoute("hub"); setCurSecId(null); } };
  const goWelcome = () => setRoute("home");

  /* CRUD scoped to the active region */
  const mutate = (fn) => setLibraries(L => ({ ...L, [locale]: fn(L[locale] || baseLibraryFor(locale)) }));
  const addItem = (sid, item) => mutate(cs => cs.map(s => s.id === sid ? { ...s, items: [...s.items, { id: uid("it"), ...item }] } : s));
  const updateItem = (sid, iid, item) => mutate(cs => cs.map(s => s.id === sid ? { ...s, items: s.items.map(it => it.id === iid ? { ...it, ...item } : it) } : s));
  const deleteItem = (sid, iid) => mutate(cs => cs.map(s => s.id === sid ? { ...s, items: s.items.filter(it => it.id !== iid) } : s));
  const addSection = (sec) => mutate(cs => [...cs, { id: uid("sec"), items: [], ...sec }]);
  const updateSection = (id, patch) => mutate(cs => cs.map(s => s.id === id ? { ...s, ...patch } : s));
  const deleteSection = (id) => mutate(cs => cs.filter(s => s.id !== id));

  const handleImport = (sections, mode) => {
    setLibraries(L => ({ ...L, [locale]: mode === "replace" ? sections : [...(L[locale] || baseLibraryFor(locale)), ...sections] }));
    setImportOpen(false);
    showToast(t.imp_ok(sections.length));
  };
  const handleExport = () => { downloadBlob(exportBlob(content), `decagon-scripts-${locale}.json`); showToast(t.toast_exported); };

  const openTele = (id) => { setCurSecId(id); setRoute("tele"); };
  const toggleCovered = (itemId) => setCovered(c => ({ ...c, [itemId]: !c[itemId] }));

  return (
    <div className="app-root">
      <StyleTag />
      {route === "home" && (
        <Home t={t} lang={lang} setLang={setLang} locale={locale} setLocale={setLocale}
          onEnter={() => setRoute("hub")} onImport={() => { setRoute("hub"); setImportOpen(true); }} />
      )}

      {route === "hub" && (
        <Hub t={t} lang={lang} setLang={setLang} locale={locale} setLocale={changeLocale} onWelcome={goWelcome}
          content={content} covered={covered}
          instructions={instructions}
          onReadInstr={() => setRoute("instructions")}
          onEditInstr={() => setInstrOpen(true)}
          onOpen={openTele}
          onNewSection={() => setSectionModal({})}
          onEditSection={(sec) => setSectionModal({ section: sec })}
          onDeleteSection={(sec) => { if (window.confirm(t.del_section_q)) deleteSection(sec.id); }}
          onAddItem={(sid) => setItemModal({ sectionId: sid, item: null })}
          onEditItem={(sid, item) => setItemModal({ sectionId: sid, item })}
          onDeleteItem={(sid, iid) => { if (window.confirm(t.del_item_q)) deleteItem(sid, iid); }}
          onImport={() => setImportOpen(true)} onExport={handleExport} />
      )}

      {route === "instructions" && (
        <InstructionsView t={t} lang={lang} setLang={setLang} locale={locale} setLocale={changeLocale}
          instructions={instructions} onBack={() => setRoute("hub")} onWelcome={goWelcome} onEdit={() => setInstrOpen(true)} />
      )}

      {route === "tele" && curSection && (
        <Teleprompter t={t} lang={lang} setLang={setLang} locale={locale} setLocale={changeLocale} onWelcome={goWelcome}
          content={content} section={curSection} covered={covered}
          onToggleCovered={toggleCovered}
          onBack={() => setRoute("hub")}
          onSwitch={(id) => setCurSecId(id)}
          onEditItem={(sid, item) => setItemModal({ sectionId: sid, item })}
          onAddItem={(sid) => setItemModal({ sectionId: sid, item: null })} />
      )}

      {itemModal && (
        <ItemModal t={t} initial={itemModal.item}
          sectionKind={(content.find(s => s.id === itemModal.sectionId) || {}).kind}
          onClose={() => setItemModal(null)}
          onSave={(item) => {
            if (itemModal.item) updateItem(itemModal.sectionId, itemModal.item.id, item);
            else addItem(itemModal.sectionId, item);
            setItemModal(null); showToast(t.toast_saved);
          }} />
      )}

      {sectionModal && (
        <SectionModal t={t} initial={sectionModal.section}
          onClose={() => setSectionModal(null)}
          onSave={(sec) => {
            if (sectionModal.section) updateSection(sectionModal.section.id, sec);
            else addSection(sec);
            setSectionModal(null); showToast(t.toast_saved);
          }} />
      )}

      {importOpen && <ImportModal t={t} onImport={handleImport} onClose={() => setImportOpen(false)} />}

      {instrOpen && (
        <InstructionsModal t={t} initial={instructions}
          onClose={() => setInstrOpen(false)}
          onSave={(txt) => { setInstructions(txt); setInstrOpen(false); showToast(t.toast_saved); }} />
      )}

      {toast && <div className="toast"><CircleCheck size={16} /> {toast}</div>}
    </div>
  );
}

/* =================== STYLES ======================================= */
function StyleTag() { return <style>{CSS}</style>; }
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600&family=Inter+Tight:wght@400;500;600&display=swap');
:root{
  --indigo:#5754ff; --indigo-h:#7370ff; --indigo-a:#443dda; --indigo100:#eeeeff;
  --copper:#c9501e; --deep:#225e84; --green:#5c8a72;
  --bg:#f4f4f5; --surface:#ffffff; --text:#131313; --dim:rgba(19,19,19,.60); --border:#e0e1e0; --muted:#f4f4f5;
  --fh:'Inter Tight','Inter',system-ui,-apple-system,sans-serif;
  --fb:'Inter',system-ui,-apple-system,sans-serif;
  --r-sm:12px; --r-md:16px; --r-lg:24px; --r-pill:100px;
}
*{box-sizing:border-box;margin:0;padding:0}
.app-root{font-family:var(--fb);color:var(--text);-webkit-font-smoothing:antialiased;min-height:100%}
.screen{min-height:640px;position:relative;overflow:hidden}
.screen.light{background:var(--bg)}
.screen.dark{background:#0a0a0b;color:#fffefe;--text:#fffefe;--dim:rgba(255,255,255,.66);--surface:#131313;--border:#2c2c2c;--muted:#1c1c1c}
.wrap{max-width:1120px;margin:0 auto;padding:0 28px;position:relative;z-index:2}
.wrap.narrow{max-width:780px}
.pad-top{padding-top:40px;padding-bottom:64px}

.hero{font-family:var(--fh);font-weight:500;font-size:clamp(38px,6vw,64px);line-height:1.02;letter-spacing:-.035em;margin:14px 0 0}
.h2{font-family:var(--fh);font-weight:500;font-size:clamp(26px,3.4vw,38px);line-height:1.08;letter-spacing:-.025em;margin:4px 0 12px}
.lead{font-size:16.5px;line-height:1.5;color:var(--dim);max-width:600px}
.lead.dim{color:var(--dim)}
.eyebrow{font-size:12px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#7d7d7d}
.eyebrow.indigo{color:var(--indigo)}

.btn{font-family:var(--fb);font-weight:500;font-size:15px;display:inline-flex;align-items:center;gap:8px;border:none;border-radius:var(--r-pill);padding:11px 20px;cursor:pointer;transition:all .16s cubic-bezier(.2,.6,.2,1);white-space:nowrap}
.btn.lg{padding:14px 26px;font-size:16px}
.btn.sm{padding:8px 14px;font-size:13.5px}
.btn.primary{background:var(--indigo);color:#fff}
.btn.primary:hover{background:var(--indigo-h);transform:translateY(-1px);box-shadow:0 8px 20px rgba(87,84,255,.26)}
.btn.primary:disabled{opacity:.5;cursor:default;transform:none;box-shadow:none;background:var(--indigo)}
.btn.outline{background:transparent;color:var(--text);border:1px solid var(--border)}
.btn.outline:hover{background:var(--muted)}
.btn.ghost{background:transparent;color:var(--text)}
.btn.ghost:hover{background:rgba(0,0,0,.05)}
.screen.dark .btn.ghost:hover,.topbar .btn.ghost:hover{background:rgba(255,255,255,.08)}
.btn.ghost.on{background:var(--indigo);color:#fff}
.btn.danger{color:#b3401a}
.btn.danger:hover{background:#fbeae4}
.btn .push,.push{margin-left:auto}

/* brand */
.brand-row{display:flex;align-items:center;gap:10px}
.brand-row.sm{gap:8px}
.dmark{color:currentColor}
.brand-name{font-family:var(--fh);font-weight:600;font-size:20px;letter-spacing:-.02em}
.brand-sub{font-size:12px;color:#7d7d7d;border-left:1px solid #333;padding-left:10px;margin-left:2px;letter-spacing:.03em}
.screen.light .brand-sub{border-color:var(--border)}
.logo{height:26px;width:auto;display:block;user-select:none;-webkit-user-drag:none}
.logo.lg{height:30px}
.screen.dark .logo{filter:brightness(0) invert(1)}
.seg.vertical{display:flex;flex-direction:column;align-items:stretch;gap:4px;width:100%;border-radius:16px;padding:6px}
.seg.vertical .seg-btn{width:100%;justify-content:flex-start;padding:11px 14px;font-size:14.5px}

/* language segmented control */
.seg{display:inline-flex;background:var(--muted);border:1px solid var(--border);border-radius:var(--r-pill);padding:3px}
.screen.dark .seg{background:#1c1c1c;border-color:#2c2c2c}
.seg-btn{font-family:var(--fb);font-size:13.5px;font-weight:500;border:none;background:transparent;color:var(--dim);padding:7px 14px;border-radius:var(--r-pill);cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .15s}
.seg-btn:hover{color:var(--text)}
.seg-btn.on{background:var(--surface);color:var(--text);box-shadow:0 1px 4px rgba(0,0,0,.08)}
.screen.dark .seg-btn.on{background:#000}
.seg-flag{font-size:15px}
.lang-seg.sm .seg-btn{padding:5px 11px;font-size:12.5px}
.lang-seg.lg .seg-btn{padding:10px 18px;font-size:15px}

/* home */
.home{display:flex;align-items:center;min-height:660px}
.lead{margin-top:16px}
.applang{margin-top:30px;background:rgba(255,255,255,.04);border:1px solid #242424;border-radius:var(--r-lg);padding:20px 22px;max-width:520px}
.applang-head{display:flex;align-items:center;gap:8px;font-family:var(--fh);font-weight:500;font-size:15px;margin-bottom:14px}
.applang-head svg{color:var(--indigo-h)}
.applang-hint{font-size:12.5px;color:var(--dim);margin-top:12px}
.home-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}
.ambient{position:absolute;right:-140px;top:50%;transform:translateY(-50%);z-index:1;pointer-events:none}
.aring{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);border:1px solid rgba(87,84,255,.2);border-radius:50%;animation:pulse 4.4s ease-out infinite}
@keyframes pulse{0%{opacity:.5;transform:translate(-50%,-50%) scale(.85)}70%{opacity:.05}100%{opacity:0;transform:translate(-50%,-50%) scale(1.15)}}

/* topbar */
.topbar{position:sticky;top:0;z-index:30;backdrop-filter:blur(14px);background:rgba(244,244,245,.82);border-bottom:1px solid var(--border)}
.screen.dark .topbar{background:rgba(10,10,11,.72);border-color:#242424}
.topbar-in{display:flex;align-items:center;justify-content:space-between;height:60px;gap:16px}
.tb-back{display:inline-flex;align-items:center;gap:6px;background:none;border:none;font-family:var(--fb);font-size:14px;color:var(--text);cursor:pointer;padding:8px 10px;border-radius:10px}
.tb-back:hover{background:rgba(0,0,0,.05)}
.screen.dark .tb-back:hover{background:rgba(255,255,255,.08)}
.tb-right{display:flex;align-items:center;gap:14px}
.tb-cov{font-size:13px;color:var(--dim);font-variant-numeric:tabular-nums}
.brand-btn{display:inline-flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;color:inherit;padding:4px 6px;border-radius:10px}
.brand-btn:hover{background:rgba(0,0,0,.05)}
.screen.dark .brand-btn:hover{background:rgba(255,255,255,.07)}
.tb-home{width:38px;height:38px;border-radius:11px;border:1px solid var(--border);background:var(--surface);color:var(--text);display:grid;place-items:center;cursor:pointer;transition:all .15s;flex-shrink:0}
.tb-home:hover{background:var(--indigo);border-color:var(--indigo);color:#fff}
.screen.dark .tb-home{background:#131313;border-color:#2c2c2c;color:#fff}
.dd{position:relative}
.dd-btn{display:inline-flex;align-items:center;gap:7px;background:var(--surface);border:1px solid var(--border);color:var(--text);border-radius:100px;padding:7px 12px;font-family:var(--fb);font-size:13px;font-weight:500;cursor:pointer;transition:all .15s}
.dd-btn:hover,.dd-btn.open{border-color:var(--indigo)}
.dd-btn>svg:first-child{color:var(--indigo)}
.screen.dark .dd-btn{background:#131313;border-color:#2c2c2c;color:#fff}
.dd-cur{display:inline-flex;align-items:center;gap:5px;font-variant-numeric:tabular-nums}
.dd-flag{font-size:15px}
.dd-ch{transition:transform .2s}.dd-ch.up{transform:rotate(180deg)}
.dd-back{position:fixed;inset:0;z-index:40}
.dd-menu{position:absolute;top:46px;right:0;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:6px;min-width:250px;z-index:50;box-shadow:0 16px 40px rgba(0,0,0,.16)}
.dd-cap{font-size:11px;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:#7d7d7d;padding:8px 10px 6px}
.dd-item{width:100%;display:flex;align-items:center;gap:10px;background:none;border:none;color:var(--text);font-family:var(--fb);font-size:13.5px;text-align:left;padding:9px 10px;border-radius:9px;cursor:pointer}
.dd-item:hover{background:var(--muted)}
.dd-item.on{background:var(--indigo100);color:var(--indigo-a)}
.dd-item .dd-main{flex:1}
.dd-item .dd-flag{font-size:16px}
.screen.dark .dd-menu{background:#151515;border-color:#2c2c2c}
.screen.dark .dd-item:hover{background:#1f1f1f}
.screen.dark .dd-item.on{background:#22224a;color:#fff}
.home-cfg{display:flex;gap:16px;flex-wrap:wrap;margin-top:28px}
.home-cfg .applang{margin-top:0;flex:1;min-width:280px}
.region-block .region-pills{display:flex;flex-wrap:wrap;gap:8px}
.rpill{display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.05);border:1px solid #262626;color:var(--dim);border-radius:100px;padding:8px 13px;font-family:var(--fb);font-size:13px;cursor:pointer;transition:all .15s}
.rpill:hover{border-color:#3a3a3a;color:#fff}
.rpill.on{background:var(--indigo);border-color:var(--indigo);color:#fff}
.rflag{font-size:15px}
.instr-card{display:flex;align-items:center;gap:14px;background:linear-gradient(180deg,#f0f7f3,#fbfdfc);border:1px solid #cfe4d8;border-radius:var(--r-lg);padding:16px 20px;margin-bottom:22px}
.instr-ic{width:40px;height:40px;border-radius:11px;background:#dcefe4;color:var(--green);display:grid;place-items:center;flex-shrink:0}
.instr-main{flex:1;min-width:0}
.instr-main b{font-family:var(--fh);font-weight:500;font-size:16px;display:block}
.instr-main span{font-size:13px;color:var(--dim)}
.instr-acts{display:flex;gap:8px;flex-shrink:0;flex-wrap:wrap}
.rec-head{display:flex;align-items:baseline;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.rec-title{font-family:var(--fh);font-weight:500;font-size:16px;display:inline-flex;align-items:center;gap:7px}
.rec-title svg{color:var(--indigo);align-self:center}
.rec-sub{font-size:13px;color:var(--dim)}
.picker-btn.static{cursor:default}
.picker-btn.static:hover{background:#1a1a1a}

/* hub */
.hub-head{display:flex;justify-content:space-between;align-items:flex-start;gap:24px;margin-bottom:24px;flex-wrap:wrap}
.hub-actions{display:flex;gap:10px;flex-wrap:wrap}
.stage-list{display:flex;flex-direction:column;gap:12px}
.stage-card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;transition:box-shadow .2s}
.stage-card:hover{box-shadow:0 6px 22px rgba(0,0,0,.05)}
.stage-main{display:flex;align-items:center;gap:12px;padding:14px 16px}
.stage-open{flex:1;min-width:0;display:flex;align-items:center;gap:15px;background:none;border:none;cursor:pointer;text-align:left;padding:0}
.stage-ic{width:44px;height:44px;border-radius:12px;background:color-mix(in srgb,var(--tint) 12%,transparent);color:var(--tint);display:grid;place-items:center;flex-shrink:0}
.stage-txt{min-width:0}
.stage-txt b{font-family:var(--fh);font-weight:500;font-size:16.5px;letter-spacing:-.01em;display:flex;align-items:center;gap:9px;flex-wrap:wrap}
.stage-txt>span{font-size:13px;color:var(--dim);display:block;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:520px}
.stage-meta{display:flex;align-items:center;gap:8px;flex-shrink:0}
.prog{display:flex;align-items:center;gap:7px;margin-right:4px}
.prog em{font-style:normal;font-size:12.5px;color:var(--dim);font-variant-numeric:tabular-nums}
.chev{color:#7d7d7d;transition:transform .2s}
.stage-card.open .chev{transform:rotate(180deg)}
.kind{display:inline-flex;align-items:center;gap:4px;font-family:var(--fb);font-size:11px;font-weight:500;padding:2px 8px;border-radius:100px}
.kind.phrases{background:var(--indigo100);color:var(--indigo-a)}
.kind.scripts{background:#e3eef5;color:var(--deep)}

.icon-btn{width:34px;height:34px;border-radius:10px;border:1px solid transparent;background:transparent;color:#636363;display:grid;place-items:center;cursor:pointer;transition:all .15s}
.icon-btn:hover{background:var(--muted);color:var(--text)}
.icon-btn.play{background:color-mix(in srgb,var(--tint) 12%,transparent);color:var(--tint)}
.icon-btn.play:hover{background:var(--tint);color:#fff}
.icon-btn.danger:hover{background:#fbeae4;color:#b3401a}
.screen.dark .icon-btn:hover{background:#1c1c1c;color:#fff}

.items-panel{border-top:1px solid var(--border);padding:14px 16px;background:#fbfbfc}
.screen.dark .items-panel{background:#0f0f10}
.items-tools{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px}
.items-list{display:flex;flex-direction:column;gap:7px;max-height:420px;overflow:auto}
.item-row{display:flex;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:10px 13px}
.item-n{font-size:12px;color:#ababab;font-variant-numeric:tabular-nums;width:20px;flex-shrink:0;text-align:center}
.item-body{flex:1;min-width:0}
.item-body b{font-family:var(--fh);font-weight:500;font-size:13.5px;display:block;margin-bottom:1px}
.item-text{font-size:13.5px;color:var(--dim);display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.item-acts{display:flex;gap:2px;flex-shrink:0}
.items-empty{font-size:13.5px;color:var(--dim);padding:12px;text-align:center}

.emo{display:inline-flex;align-items:center;gap:6px;border-radius:100px;padding:3px 11px;background:color-mix(in srgb,var(--emo) 13%,transparent);flex-shrink:0}
.emo span{font-size:14px;line-height:1}
.emo em{font-style:normal;font-size:12px;font-weight:500;color:var(--emo)}

.empty{text-align:center;padding:64px 20px;color:var(--dim)}
.empty svg{color:#ababab;margin-bottom:14px}
.empty b{display:block;font-family:var(--fh);font-size:19px;color:var(--text);margin-bottom:6px}
.empty p{max-width:380px;margin:0 auto 20px}
.empty-cta{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}

/* teleprompter */
.tele{display:flex;flex-direction:column}
.tele-bar{border-bottom:1px solid #242424;background:#0d0d0e;position:sticky;top:60px;z-index:20}
.tele-bar-in{display:flex;align-items:center;justify-content:space-between;height:52px;gap:16px}
.tele-picker{position:relative}
.picker-btn{display:inline-flex;align-items:center;gap:8px;background:#1a1a1a;border:1px solid #2c2c2c;color:#fff;font-family:var(--fh);font-weight:500;font-size:14.5px;padding:8px 14px;border-radius:100px;cursor:pointer;max-width:420px}
.picker-btn:hover{background:#222}
.picker-menu{position:absolute;top:46px;left:0;background:#151515;border:1px solid #2c2c2c;border-radius:14px;padding:6px;width:340px;max-height:360px;overflow:auto;z-index:40;box-shadow:0 16px 40px rgba(0,0,0,.5)}
.picker-item{width:100%;display:flex;align-items:center;gap:10px;background:none;border:none;color:#e0e0e0;font-family:var(--fb);font-size:13.5px;text-align:left;padding:9px 11px;border-radius:9px;cursor:pointer}
.picker-item:hover{background:#1f1f1f}
.picker-item.on{background:#22224a;color:#fff}
.picker-item span{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.picker-item em{font-style:normal;font-size:11px;color:#8a8a8a;font-variant-numeric:tabular-nums}
.tele-tools{display:flex;align-items:center;gap:12px}
.fontctl{display:flex;align-items:center;gap:8px;background:#1a1a1a;border:1px solid #2c2c2c;border-radius:100px;padding:4px 6px}
.fontctl button{width:26px;height:26px;border-radius:50%;border:none;background:#000;color:#fff;cursor:pointer;display:grid;place-items:center}
.fontctl button:hover{background:#2a2a2a}
.fontctl span{font-size:12.5px;color:#c4c4c4;display:inline-flex;align-items:center;gap:5px;font-variant-numeric:tabular-nums;min-width:56px;justify-content:center}

.tele-body{flex:1;max-width:960px;margin:0 auto;width:100%;padding:24px 28px 40px;display:flex;flex-direction:column}
.stage-crumbs{display:flex;align-items:center;gap:12px;font-size:13px;color:var(--dim);margin-bottom:14px}
.stage-crumbs>span:first-child{font-weight:600}
.crumb-count{font-variant-numeric:tabular-nums;color:#7d7d7d}
.crumb-done{display:inline-flex;align-items:center;gap:5px;color:#7fcaa0}

.prompter{position:relative;background:#131313;border:1px solid #262626;border-radius:var(--r-lg);padding:36px 42px;min-height:280px;display:flex;flex-direction:column;justify-content:center}
.pr-emo{position:absolute;top:18px;right:20px;display:inline-flex;align-items:center;gap:8px;background:color-mix(in srgb,var(--emo) 18%,#151515);border:1px solid color-mix(in srgb,var(--emo) 45%,transparent);padding:7px 14px 7px 10px;border-radius:100px}
.pr-emo span{font-size:20px;line-height:1}
.pr-emo em{font-style:normal;font-weight:500;font-size:13px;color:#fff}
.pr-edit{position:absolute;top:18px;left:20px;width:32px;height:32px;border-radius:9px;border:1px solid #2c2c2c;background:#1a1a1a;color:#9a9a9a;display:grid;place-items:center;cursor:pointer;transition:all .15s}
.pr-edit:hover{background:var(--indigo);color:#fff;border-color:var(--indigo)}
.pr-title{font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#7d7d7d;margin-bottom:16px;font-weight:600;padding:0 44px}
.pr-phrase{font-family:var(--fh);font-weight:400;line-height:1.2;letter-spacing:-.02em;color:#fffefe;text-align:center}
.pr-phrase.step{font-weight:450;line-height:1.28;text-align:left;letter-spacing:-.01em}
.pr-step-label{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--tint);margin-bottom:14px;font-weight:600}
.scn-strip{display:flex;align-items:center;gap:8px;margin-bottom:12px}
.scn-arrow{width:34px;height:34px;border-radius:10px;border:1px solid #2c2c2c;background:#151515;color:#cfcfcf;display:grid;place-items:center;cursor:pointer;flex-shrink:0;transition:all .15s}
.scn-arrow:hover:not(:disabled){background:#222;color:#fff}
.scn-arrow:disabled{opacity:.35;cursor:default}
.scn-title{flex:1;min-width:0;display:flex;align-items:center;gap:8px;background:#151515;border:1px solid #2c2c2c;color:#fff;border-radius:10px;padding:9px 14px;cursor:pointer;font-family:var(--fh);font-weight:500;font-size:14.5px;transition:background .15s}
.scn-title:hover{background:#1e1e1e}
.scn-title>span{flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.scn-title svg:last-child{color:#7d7d7d;flex-shrink:0}
.ctx-card{background:#111;border:1px solid #262626;border-radius:14px;margin-bottom:14px;overflow:hidden}
.ctx-head{width:100%;display:flex;align-items:center;justify-content:space-between;background:none;border:none;color:#cfcfcf;cursor:pointer;padding:11px 16px;font-family:var(--fb)}
.ctx-label{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:#8a8a8a}
.ctx-head .chev{transition:transform .2s}.ctx-head .chev.up{transform:rotate(180deg)}
.ctx-body{padding:0 16px 14px;color:#d0d0d0;line-height:1.5;font-size:15px}
.steps-badge{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;color:#4186ff;background:#e3eef5;background:rgba(65,134,255,.12);padding:3px 10px;border-radius:100px;flex-shrink:0}
.hint-line{display:inline-flex;align-items:center;gap:5px;font-size:12px;color:var(--dim);margin-top:6px}
.hint-line svg{opacity:.7}
.pr-scroll{max-height:52vh;overflow:auto;padding-right:6px}
.pr-script{font-family:var(--fb);white-space:pre-wrap;line-height:1.65;color:#e8e8e8}

.tele-nav{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:22px}
.navbtn{display:inline-flex;align-items:center;gap:6px;background:none;border:1px solid #2c2c2c;color:#fff;border-radius:100px;padding:10px 18px;font-family:var(--fb);font-size:14px;cursor:pointer;transition:background .15s}
.navbtn:hover:not(:disabled){background:#1c1c1c}
.navbtn:disabled{opacity:.35;cursor:default}
.cov-btn{background:#1a1a1a;border:1px solid #2c2c2c;color:#cfcfcf;border-radius:100px;padding:10px 20px;font-family:var(--fb);font-size:14px;cursor:pointer;display:inline-flex;align-items:center;gap:7px;transition:all .15s}
.cov-btn:hover{background:#222;color:#fff}
.cov-btn.on{background:#1f3a2c;border-color:#2f5a44;color:#7fcaa0}
.dots{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;margin-top:20px}
.dot{width:9px;height:9px;border-radius:50%;background:#333;cursor:pointer;transition:all .15s}
.dot:hover{transform:scale(1.3)}
.dot.done{background:var(--green)}
.dot.cur{background:var(--indigo-h);box-shadow:0 0 0 3px rgba(115,112,255,.25)}
.more{font-size:12px;color:#7d7d7d}
.tele-empty{text-align:center;padding:70px 20px;color:var(--dim)}
.tele-empty p{margin-bottom:18px}

/* modal */
.overlay{position:fixed;inset:0;background:rgba(10,10,11,.55);backdrop-filter:blur(4px);z-index:80;display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .18s ease}
.modal{background:var(--surface);color:var(--text);border-radius:var(--r-lg);width:100%;max-width:520px;max-height:90vh;display:flex;flex-direction:column;box-shadow:0 24px 60px rgba(0,0,0,.3);animation:pop .2s cubic-bezier(.2,.7,.3,1)}
.modal.wide{max-width:620px}
.modal-head{display:flex;align-items:center;justify-content:space-between;padding:20px 22px 14px}
.modal-head h3{font-family:var(--fh);font-weight:500;font-size:19px;letter-spacing:-.01em}
.modal-body{padding:4px 22px 8px;overflow:auto}
.modal-foot{display:flex;align-items:center;gap:10px;padding:16px 22px;border-top:1px solid var(--border);margin-top:12px}
.foot-push{flex:1}
.field{margin-bottom:16px}
.field label{display:block;font-size:12.5px;font-weight:500;color:var(--dim);margin-bottom:7px}
.field input,.field textarea{width:100%;font-family:var(--fb);font-size:14.5px;color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:11px 13px;outline:none;transition:border .15s}
.field textarea{resize:vertical;line-height:1.5}
.field textarea.mono{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:12.5px}
.field input:focus,.field textarea:focus{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(87,84,255,.12)}
.err{display:block;font-size:12.5px;color:#b3401a;margin-top:6px}
.emo-input{position:relative}
.emo-preview{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:18px}
.kind-pick{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.kind-opt{text-align:left;background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:14px;cursor:pointer;transition:all .15s;display:flex;flex-direction:column;gap:4px;color:var(--text)}
.kind-opt svg{color:#7d7d7d}
.kind-opt b{font-family:var(--fh);font-weight:500;font-size:14.5px}
.kind-opt span{font-size:12px;color:var(--dim);line-height:1.35}
.kind-opt.on{border-color:var(--indigo);box-shadow:0 0 0 3px rgba(87,84,255,.14)}
.kind-opt.on svg{color:var(--indigo)}
.imp-desc{font-size:13.5px;color:var(--dim);line-height:1.5;margin-bottom:14px}
.imp-file{display:flex;align-items:center;gap:12px;margin-bottom:16px;flex-wrap:wrap}
.imp-fname{display:inline-flex;align-items:center;gap:6px;font-size:13px;color:var(--dim)}
.mode-seg{width:100%}
.mode-seg .seg-btn{flex:1;justify-content:center}

/* toast */
.toast{position:fixed;bottom:26px;left:50%;transform:translateX(-50%);background:#131313;color:#fff;display:inline-flex;align-items:center;gap:9px;padding:13px 20px;border-radius:100px;font-size:14px;z-index:90;box-shadow:0 12px 34px rgba(0,0,0,.3);animation:tin .25s ease}
.toast svg{color:#7fcaa0}
@keyframes tin{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
@keyframes fade{from{opacity:0}to{opacity:1}}
@keyframes pop{from{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:none}}

.fade-up{animation:fu .55s cubic-bezier(.2,.6,.2,1) both}
.fade-up.d1{animation-delay:.06s}.fade-up.d2{animation-delay:.12s}.fade-up.d3{animation-delay:.18s}
@keyframes fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

@media(max-width:760px){
  .hub-head{flex-direction:column}
  .kind-pick{grid-template-columns:1fr}
  .stage-txt>span{max-width:200px}
  .picker-menu{width:280px}
  .tb-right{gap:8px}
  .dd-btn{padding:7px 9px}
  .dd-cur{font-size:0}
  .dd-cur .dd-flag{font-size:17px}
  .dd-menu{min-width:210px}
  .instr-card{flex-direction:column;align-items:flex-start}
  .instr-acts{width:100%}
  .lang-seg .seg-btn span,.lang-seg.sm .seg-btn{font-size:0}
  .lang-seg.sm .seg-flag{font-size:16px}
  .prompter{padding:26px 20px}
  .pr-title{padding:0}
  .pr-emo{position:static;margin:0 auto 14px;align-self:center}
  .pr-edit{position:static;margin-bottom:10px}
}
`;
