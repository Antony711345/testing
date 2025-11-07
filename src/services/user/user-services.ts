
import { Service } from '../base';
import type { IChatPayload, IUserDetailPayload, IUserSessionPayload, IUserConversationCountPayload, IUserSaveAnoDetailPayload, IClearHistoryPayload, ISaveFormDetailsPayload, ImageDecodePayload } from './user.interfaces';

const ENDPOINTS = {
    USER_CHAT: '/query_v1',
    USER_DETAIL: '/get_user_data_for_chat',
    USER_SESSION:'/get_user_session',
    CONVERSATIONCOUNT: '/conversation_count',
    SAVEANONOMOUSDATAIL: '/save_anonomous_user',
    CLEARHISTORY:'/clear_history',
    SAVEFORMDETAILS: '/save_form_details',
    IMAGE_DECODE:'/api/getPresigned',
    CALL_MASTER_AGENT: '/call_master_agent',
    LIST_STOBAY_BUSINESS:'/list_stobay_business',
    STOBAY_BUSINESS: '/stobay_business',
};

export class UserService extends Service {
    async userChat(payload: IChatPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.USER_CHAT, payload);
        return response;
    }
    async userDetail(payload: IUserDetailPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.USER_DETAIL, payload);
        return response;
    }
    async userSession(payload: IUserSessionPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.USER_SESSION, payload);
        return response;
    }
    async userConversationCount(payload: IUserConversationCountPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.CONVERSATIONCOUNT, payload);
        return response;
    }
    async userSaveAnonomousDetail(payload: IUserSaveAnoDetailPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.SAVEANONOMOUSDATAIL, payload);
        return response;
    }
    async userClearHistory(payload: IClearHistoryPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.CLEARHISTORY, payload);
        return response;
    }
    async userSaveFormDetails(payload: ISaveFormDetailsPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.SAVEFORMDETAILS, payload);
        return response;
    }
    async imageDecode(payload: ImageDecodePayload): Promise<any> {
        const response = await this.agent.get(ENDPOINTS.IMAGE_DECODE, { params: payload });
        return response;
    }
    async callMasterAgent(payload: IChatPayload): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.CALL_MASTER_AGENT, payload);
        return response;
    }
    async listStobayBusiness(): Promise<any> {
        const response = await this.agent.get(ENDPOINTS.LIST_STOBAY_BUSINESS);
        return response;
    }
    async businessDetail(payload: {bot_username: string}): Promise<any> {
        const response = await this.agent.post(ENDPOINTS.STOBAY_BUSINESS, payload );
        return response;
    }
}


