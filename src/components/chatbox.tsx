import React, { useCallback, useEffect, useRef, useState, memo, useMemo } from "react";
import { ChatMessage, SendMessage } from "../assets/icons";
import type { TemplateFormDataType } from "../services/user/user.interfaces";
import { useUserChat, useUserClearHistory, useUserconversationCount, useUserSession } from "../services/hooks/user.data";
import { signInAnonymouslyUser } from "../../firebase";
import { LeadForm } from "../common/lead_form";
import { FormFieldData } from "./data";

interface ConversationProps {
    message: string;
    message_from: number; // 0 for bot, 1 for user
    timestamp: string;
}

interface ChatBoxProps {
    businessDetail?: TemplateFormDataType;
    photoURL?: string;
}

export const ChatBox = memo(function ChatBox({
    businessDetail,
    photoURL = "/images/profile-chat.svg"
}: ChatBoxProps) {
    const { mutateAsync: userChat, isPending: isUserDeletePending } = useUserChat();
    const { mutateAsync: conversationCount } = useUserconversationCount();
    const { mutateAsync: chatHistory, isPending: isClearingHistoryPending } = useUserClearHistory();
    const { mutateAsync: userSession, isPending: isUserSessionPending } = useUserSession();
    const [question, setQuestion] = useState("");
    const [conversation, setConversation] = useState<ConversationProps[]>([]);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isFormShown, setIsFormShown] = useState(false);
    const [sessionID, setSessionID] = useState<string>(localStorage.getItem('chat_session_id') || '');
    const [showPopup, setShowPopup] = useState(false);
    const [isShowLeadForm, setIsShowLeadForm] = useState(false);
    const activity_type = "visit";
    const chatContainerRef = useRef<HTMLDivElement | null>(null);
    const bot_username = window.location.pathname.split('/')[1] || '';

    const formatDate = (timestamp: string | Date) => {
        const date = new Date(timestamp);
        return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const browserDetail = useMemo(() => ({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
    }), []);

    const fetchConversationCount = async () => {
        try {
            let user = await signInAnonymouslyUser();
            const uid = user as string;
            console.log("uid", uid);
            const response = await conversationCount({
                guest_id: uid,
                session_id: sessionID as string,
                slug: bot_username,
                bot_username: bot_username
            });

            const capture = response.data.capture;
            if (response.data) {
                // if (response.data.total_tokens > getTokenLimit().value) {
                //     setIsShowUpgradePopup(true);
                // }
                // setUsedTokens(response.data.total_tokens);
                setIsFormShown(response.data.form_shown);
                if (response.data.ano_data_flag === 1 && !response.data.form_shown) {
                    console.log("response.data.ano_data_flag not 1");
                    if (capture === "sequential") {
                        //   if (count === 3) {
                        //   setSkipCount(2);
                        //   setShowPopup(true);
                        // } else if (count === 6) {
                        //   setSkipCount(1);
                        //   setShowPopup(true);
                        // } else if (count >= 9) {
                        //   setSkipCount(0)
                        //   console.log("count 9 tha vida perusu")

                        setShowPopup(true);
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching conversation count:", error);
        }
    };

    const handleChat = async () => {
        if (!question.trim()) return;
        const currentDate = formatDate(new Date());
        const userMessageIndex = conversation?.length ?? 0;
        // const keywords = botDetail?.keywords;

        // const isFormValid = Array.isArray(keywords) && keywords.some(keyword =>
        //     question.toLowerCase().includes(keyword.toLowerCase())
        // );
        // if (usedTokens > getTokenLimit().value) {
        //     showAlert(`You have reached your token limit of ${getTokenLimit().display}. Please upgrade your plan to continue.`, "error");
        //     setIsShowUpgradePopup(true);
        //     return;
        // }
        setConversation((prevData) => prevData ? [
            ...prevData,
            {
                message: question,
                message_from: 1,
                timestamp: currentDate,
            },
        ] : [{
            message: question,
            message_from: 1,
            timestamp: currentDate,
        }]);
        setQuestion("");
        setLoadingIndex(userMessageIndex);
        if (!isFormShown) {
            setIsShowLeadForm(true);
        }
        try {
            let response = await userChat({
                question,
                session_id: sessionID,
                slug: bot_username,
                bot_username: bot_username
            })
            // : await callMasterAgent({
            //   question,
            //   session_id: sessionID,
            //   slug: userName
            // });
            await fetchConversationCount();
            if (response?.data) {
                console.log("response.data", response.data.response);
                if (!bot_username) {
                    setConversation((prevData) => prevData ? [
                        ...prevData,
                        {
                            message: response.data.answer,
                            message_from: 0,
                            timestamp: currentDate,
                        },
                    ] : [{
                        message: response.data.answer,
                        message_from: 0,
                        timestamp: currentDate,
                    }]);
                    return;
                }
                if (response.data.form_details && Array.isArray(response.data.form_details) && response.data.form_details.length > 0) {
                    if (response.data.answer) {
                        setConversation((prevData) => prevData ? [
                            ...prevData,
                            {
                                message: response.data.answer,
                                message_from: 0,
                                timestamp: currentDate,
                            },
                        ] : [{
                            message: response.data.answer,
                            message_from: 0,
                            timestamp: currentDate,
                        }]);
                    }
                    return;
                } else {
                    if (response.data.answer) {
                        setConversation((prevData) => prevData ? [
                            ...prevData,
                            {
                                message: response.data.answer,
                                message_from: 0,
                                timestamp: currentDate,
                            },
                        ] : [{
                            message: response.data.answer,
                            message_from: 0,
                            timestamp: currentDate,
                        }]);
                    }
                }
            }
        } catch (error) {
            // showAlert("Failed to fetch response from the server.", "error");
            if (error instanceof Error) {
                // showAlert(error.message, "error");
            }
        } finally {
            setLoadingIndex(null);
        }
    };
    const handleClearHistory = async () => {
        try {
            await chatHistory({
                session_id: sessionID,
                slug: bot_username,
                bot_username: bot_username
            });
            setConversation([]);
        } catch (error) {
            // showAlert("Failed to clear chat history.", "error");
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setPopupVisible(true);
            setTimeout(() => setPopupVisible(false), 3000);
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "NumpadEnter") {
            e.preventDefault();
            handleChat();
        }
    };

    const handleScroll = useCallback(() => {
        if (chatContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
            const isAtBottomNow = scrollTop + clientHeight >= scrollHeight - 10;
            const shouldShowButton = scrollTop > 100;

            setIsAtBottom(isAtBottomNow);
            setShowScrollButton(shouldShowButton);
        }
    }, []);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };

    const getWelcomeMessage = () => {
        if (businessDetail?.businessName) {
            return `Hi there! 👋 Welcome to ${businessDetail.businessName}. How can I assist you today?`;
        }
        return "Hi! I can help with information about this business. What would you like to know about our services, pricing, or timings?";
    };

    const handleClosePopup = () => {
        fetchConversationCount();
        setIsShowLeadForm(false);
    };

    const commonQuestions = [
        "What services do you offer?",
        "What are your pricing or packages?",
        "What are your operating hours or timings?"
    ];

    useEffect(() => {
        const handleUserSession = async () => {
            const bot_username = window.location.pathname.split('/')[1] || '';
            try {
                let response;
                try {
                    response = await userSession({
                        activity_type,
                        browser_detail: browserDetail,
                        session_id: sessionID || "",
                        username: bot_username,
                        bot_username: bot_username
                    });
                } catch (err: unknown) {
                    if (err && typeof err === 'object' && 'response' in err && err.response && typeof err.response === 'object' && 'data' in err.response && err.response.data && typeof err.response.data === 'object' && 'error' in err.response.data && err.response.data.error === "Session ID not found") {
                        setSessionID("");
                        response = await userSession({
                            activity_type,
                            browser_detail: browserDetail,
                            session_id: "",
                            username: bot_username,
                            bot_username: bot_username
                        });
                    } else {
                        throw err;
                    }
                }

                if (response) {
                    const newSessionId = response.data.session_id || sessionID;

                    setSessionID(newSessionId);
                    localStorage.setItem('chat_session_id', newSessionId || '');
                    setConversation(response.data.conversation || [])
                }
            } catch (error) {
                setSessionID("");
            }
        }
        handleUserSession();
    }, [userSession, browserDetail, activity_type, setSessionID]);

    useEffect(() => {
        if (sessionID) {
            fetchConversationCount();
        }
    }, [sessionID]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    if(isUserDeletePending || isClearingHistoryPending || isUserSessionPending) {
        return (
            <div className="w-full h-full border border-[#032246CC] md:py-6 py-4 md:px-7 px-5 rounded-2xl flex flex-col font-inter relative bg-[#FFFFFF]/30">
                <div className="flex justify-center items-center w-full h-full">
                    <span className="text-lg text-[#032246]">Loading chat...</span>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full h-full border border-[#032246CC] md:py-6 py-4 md:px-7 px-5 rounded-2xl flex flex-col font-inter relative">
            {showPopup && (
                <LeadForm form_bg={"bg-primarylight"} button_style={"bg-primary text-white"} handleClose={() => setShowPopup(false)} type={"sequence"} formFields={FormFieldData} username={bot_username} botUsername={bot_username} sessionID={sessionID} />
            )}
            {isShowLeadForm && (
                <LeadForm form_bg={"bg-primarylight"} button_style={"bg-primary text-white"} handleClose={handleClosePopup} type={"keyword"} formFields={FormFieldData} username={bot_username} botUsername={bot_username} sessionID={sessionID} />
            )}
            {/* Initial state when no conversation */}
            {conversation.length === 0 && !question && (
                <div className="flex flex-col w-full gap-4 text-[#032246] pb-5 overflow-y-auto">
                    <div className="flex gap-2 items-center">
                        <div className="w-11 h-11 rounded-full flex items-center justify-center bg-[#0322461A]">
                            <ChatMessage className="w-4 h-4 text-[#032246]" />
                        </div>
                        <span className="font-semibold md:text-lg w-[calc(100%_-_3.25rem)]">Ask Stobay Assistant about this business</span>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <span className="md:text-base text-sm">{getWelcomeMessage()}</span>
                        <div className="flex flex-col gap-2">
                            <span className="font-medium md:text-base text-sm">Common questions:</span>
                            {commonQuestions.map((question, index) => (
                                <div
                                    key={index}
                                    className="bg-[#0322460D] md:text-sm text-xs py-2 px-4 xl:w-10/12 w-full rounded-md cursor-pointer hover:bg-[#03224615] transition-colors"
                                    onClick={() => setQuestion(question)}
                                >
                                    {question}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Chat conversation */}
            {conversation.length > 0 && (
                <div
                    className="flex flex-col flex-1 overflow-y-auto mb-16 px-1.5 pt-2 min-h-0 space-y-4 textAnsNo"
                    ref={chatContainerRef}
                    onScroll={handleScroll}
                >
                    {conversation.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex gap-2 md:gap-4 ${msg.message_from === 1
                                ? "justify-end items-end"
                                : "justify-start items-start"
                                }`}
                        >
                            {msg.message_from === 0 && (
                                <div className="h-8 w-8 rounded-full border border-[#032246] flex justify-center items-center flex-shrink-0">
                                    <img
                                        height={32}
                                        width={32}
                                        src={typeof businessDetail?.uploadLogo === 'string' ? businessDetail.uploadLogo : photoURL}
                                        alt="Bot"
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col gap-1 max-w-[80%]">
                                <div
                                    className={`px-4 py-3 rounded-2xl ${msg.message_from === 1
                                        ? "bg-[#032246] text-white rounded-br-sm"
                                        : "bg-[#F7FAFC] text-[#032246] border border-[#E2E8F0] rounded-bl-sm"
                                        }`}
                                >
                                    <p className="text-sm break-words">{msg.message}</p>
                                    {msg.message_from === 0 && (
                                        <div className="flex justify-end items-center text-xs mt-2">
                                            <button
                                                className="flex items-center gap-1 text-[#666] hover:text-[#032246] cursor-pointer transition-colors"
                                                onClick={() => copyToClipboard(msg.message)}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                </svg>
                                                Copy
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500 px-2">
                                    {formatDate(msg.timestamp)}
                                </span>
                            </div>

                            {msg.message_from === 1 && (
                                <div className="h-8 w-8 rounded-full border border-[#032246] flex justify-center items-center flex-shrink-0">
                                    <img
                                        height={32}
                                        width={32}
                                        src="/images/profile-chat.svg"
                                        alt="User"
                                        className="h-6 w-6 rounded-full object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Loading indicator */}
                    {loadingIndex !== null && (
                        <div className="flex gap-4">
                            <div className="h-8 w-8 rounded-full border border-[#032246] flex justify-center items-center">
                                <img
                                    height={32}
                                    width={32}
                                    src={typeof businessDetail?.uploadLogo === 'string' ? businessDetail.uploadLogo : photoURL}
                                    alt="Bot"
                                    className="h-6 w-6 rounded-full object-cover"
                                />
                            </div>
                            <div className="flex items-center bg-[#F7FAFC] px-4 py-3 rounded-2xl">
                                <div className="flex space-x-1">
                                    <div className="w-2 h-2 bg-[#032246] rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-[#032246] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                                    <div className="w-2 h-2 bg-[#032246] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Clear history button */}
                    {conversation.length > 0 && (
                        <button
                            onClick={handleClearHistory}
                            className="flex gap-1.5 items-center py-1.5 w-fit hover:bg-red-50 hover:text-red-500 px-2.5 text-sm rounded-md transition-colors mt-4"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Clear Chat
                        </button>
                    )}
                </div>
            )}

            {/* Scroll to bottom/top button */}
            {showScrollButton && conversation.length > 0 && (
                <div className="absolute bottom-20 right-4 z-[80]">
                    <button
                        onClick={isAtBottom ? scrollToTop : scrollToBottom}
                        className="bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200 hover:bg-gray-50"
                        title={isAtBottom ? "Scroll to top" : "Scroll to bottom"}
                    >
                        {!isAtBottom ? (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        )}
                    </button>
                </div>
            )}

            {/* Input area */}
            <div className="mt-auto py-4 border-t border-gray-100 absolute bottom-0 left-0 w-full md:px-7 px-5">
                <div className="flex relative">
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loadingIndex !== null || isUserDeletePending || isClearingHistoryPending || isUserSessionPending}
                        placeholder="Ask about services, pricing, timings..."
                        className="md:w-[calc(100%-3.5rem)] w-[calc(100%_-_3.125rem)] px-4 md:py-3 py-2.5 bg-[#F7FAFC] placeholder:text-[#ADAEBC] md:rounded-xl rounded-lg xl:text-base text-sm outline-none border border-transparent transition-colors disabled:opacity-50"
                    />
                    <button
                        type="button"
                        onClick={handleChat}
                        disabled={!question.trim() || loadingIndex !== null || isUserDeletePending || isClearingHistoryPending || isUserSessionPending}
                        className="md:h-11 h-10 md:w-11 w-10 flex items-center justify-center bg-[#FC0] text-[#032246] font-medium rounded-xl cursor-pointer hover:bg-[#FFD700] transition-colors disabled:opacity-50 absolute right-1 top-1/2 transform -translate-y-1/2"
                    >
                        {loadingIndex !== null ? (
                            <div className="w-4 h-4 border-2 border-[#032246] border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <SendMessage className="w-4 h-4" />
                        )}
                    </button>
                </div>
            </div>

            {/* Copy notification popup */}
            {popupVisible && (
                <div className="fixed bottom-6 left-1/2 transform z-[100] bg-[#032246] text-white -translate-x-1/2 px-4 py-2 rounded-full shadow-lg">
                    Text copied to clipboard!
                </div>
            )}
        </div>
    );
});