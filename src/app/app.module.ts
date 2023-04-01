import { BrowserModule,Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorModule } from '@tinymce/tinymce-angular';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule }  from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { McComponent } from './mc/mc.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPwdComponent } from './auth/forgot-pwd/forgot-pwd.component';
import { LogoutComponent } from './auth/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { AgentsComponent } from './agents/agents.component';
import { AgentsformComponent } from './agents/agentsform.component';
import { QueueComponent } from './queue/queue.component';
import { QueueformComponent } from './queue/queueform.component';
import { CallComponent } from './call/call.component';
import { CallHistoryComponent } from './call/call-history/call-history.component';
import { ChatComponent } from './mc/chat/chat.component';
import { EmailComponent } from './mc/email/email.component';
import { DialpadComponent } from './mc/dialpad/dialpad.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { SettingMenuComponent } from './setting-menu/setting-menu.component';
import { ServerService } from './services/server.service';
import { PbcSettingsComponent } from './pbc-settings/pbc-settings.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { SmsComponent } from './mc/sms/sms.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { EditContactsComponent } from './edit-contacts/edit-contacts.component';
// import { TabsComponent } from './tabs/tabs.component';
import { ActivityComponent } from './activity/activity.component';
import { CsvContactUploadComponent } from './csv-contact-upload/csv-contact-upload.component';
import { ContactReportComponent } from './contact-report/contact-report.component';
import { ComposeSmsComponent } from './compose-sms/compose-sms.component';
import { TicketingSystemComponent } from './ticketing-system/ticketing-system.component';
import { TicketViewComponent } from './ticket-view/ticket-view.component';
import { TicketComposeComponent } from './ticket-compose/ticket-compose.component';
import { DepartmentComponent } from './department/department.component';
import { TicketReportComponent } from './ticket-report/ticket-report.component';
import { TicketingSystemNewComponent } from './ticketing-system-new/ticketing-system-new.component';
import { TicketForwardComponent } from './ticket-forward/ticket-forward.component';
import { ChatbootAiComponent } from './chatboot-ai/chatboot-ai.component';
import { ChatbotQuestionFeedComponent } from './chatbot-question-feed/chatbot-question-feed.component';
import { TicketViewThreadComponent } from './ticket-view-thread/ticket-view-thread.component';
import { TicketCreateNewComponent } from './ticket-create-new/ticket-create-new.component';
import { WhatsappChatComponent } from './whatsapp-chat/whatsapp-chat.component';
import { AuxCodeComponent } from './aux-code/aux-code.component';
import { AppSettingsComponent } from './app-settings/app-settings.component';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { WallboardComponent } from './wallboard/wallboard.component';
import { GlobalSettingsComponent } from './global-settings/global-settings.component';
import { AuxCodesComponent } from './aux-codes/aux-codes.component';
import { AuxCodeReportComponent } from './aux-code-report/aux-code-report.component';
// import { CampaignComponent } from './campaign/campaign.component';
// import { CampaignContactsComponent } from './campaign-contacts/campaign-contacts.component';
// import { CampaignContactsAddComponent } from './campaign-contacts-add/campaign-contacts-add.component';
// import { CampaignContactsEditComponent } from './campaign-contacts-edit/campaign-contacts-edit.component';
import { AgentPermissionComponent } from './agent-permission/agent-permission.component';
import { CallReportComponent } from './call-report/call-report.component';
import { QueueManagementComponent } from './queue-management/queue-management.component';
import { LeadManagementComponent } from './lead-management/lead-management.component';
import { LogReportComponent } from './log-report/log-report.component';
import { CustomWallboardComponent } from './custom-wallboard/custom-wallboard.component';
import { SmsGroupsComponent } from './sms-groups/sms-groups.component';
import { UnassignedTicketsComponent } from './unassigned-tickets/unassigned-tickets.component';
import { CustomWallboardTwoComponent } from './custom-wallboard-two/custom-wallboard-two.component';
import { SmsCsvUploadComponent } from './sms-csv-upload/sms-csv-upload.component';
// import { IpcReportComponent } from './ipc-report/ipc-report.component';
// import { SpReportComponent } from './sp-report/sp-report.component';
// import { AvayaReportComponent } from './avaya-report/avaya-report.component';
// import { CustomWallboardThreeComponent } from './custom-wallboard-three/custom-wallboard-three.component';
import { MarketPlaceComponent } from './market-place/market-place.component';
// import { CustomWallboardFourComponent } from './custom-wallboard-four/custom-wallboard-four.component';
import { SmsTemplatesComponent } from './sms-templates/sms-templates.component';
// import { MarketplaceWallboardComponent } from './marketplace-wallboard/marketplace-wallboard.component';
// import { MarketplaceCustomReportComponent } from './marketplace-custom-report/marketplace-custom-report.component';
// import { DemoPageComponent } from './demo-page/demo-page.component';
import { UploadDocumentsComponent } from './upload-documents/upload-documents.component';
import { DocumentDownloadComponent } from './document-download/document-download.component';
import { FbChatComponent } from './fb-chat/fb-chat.component';
import { AgentSettingaComponent } from './agent-settinga/agent-settinga.component';
import { SafePipe } from './safe.pipe';
import { ChatRatingsComponent } from './chat-ratings/chat-ratings.component';
import { SurveyReportComponent } from './survey-report/survey-report.component';
import { SurveySummaryReportComponent } from './survey-summary-report/survey-summary-report.component';
import { ChatWidgetSettingsComponent } from './chat-widget-settings/chat-widget-settings.component';
// import { FaxComponent } from './fax/fax.component';
// import { NewOutboundFaxComponent } from './new-outbound-fax/new-outbound-fax.component';
// import { GaugeChartModule } from 'angular-gauge-chart'
// import { GoogleChartsModule } from 'angular-google-charts';
// import { UserIdleModule } from 'angular-user-idle';
// import { TestComponent } from './test/test.component';
import { ReportComponent } from './report/report.component';
// import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import { InternalChatComponent } from './mc/internal-chat/internal-chat.component';
import { ComposeWpComponent } from './compose-wp/compose-wp.component';
// import { InvalidCampaignContactComponent } from './invalid-campaign-contact/invalid-campaign-contact.component';
// import { DndComponent } from './dnd/dnd.component';
// import { FaxAdministrationComponent } from './fax-administration/fax-administration.component';
import { FooterComponent } from './footer/footer.component';
// import { CardlifeComponent } from './cardlife/cardlife.component';
// import { PredictiveDialerContactComponent } from './predictive-dialer-contact/predictive-dialer-contact.component';
// import { AngularFireModule } from '@angular/fire';
// import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { environment } from '../environments/environment';
import { CallQueueComponent } from './call-queue/call-queue.component';
import { CallQueueListComponent } from './call-queue-list/call-queue-list.component';
import { CallQueueManagementComponent } from './call-queue-management/call-queue-management.component';
// import { BufferMarketingComponent } from './buffer-marketing/buffer-marketing.component';
// import { LineChatComponent } from './line-chat/line-chat.component';
// import { TeleChatComponent } from './tele-chat/tele-chat.component';
import { SmsReportComponent } from './sms-report/sms-report.component';
import { SmsTariffComponent } from './sms-tariff/sms-tariff.component';
// import { PaymentResultsComponent } from './payment-results/payment-results.component';
// import { CheckOutComponent } from './check-out/check-out.component';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { AdminPlansComponent } from './admin-plans/admin-plans.component';
// import { WpPayComponent } from './wp-pay/wp-pay.component';
import {DatePipe} from '@angular/common';
import { WhatsappUnoffComponent } from './whatsapp-unoff/whatsapp-unoff.component';
import { WpintsettingsComponent } from './wpintsettings/wpintsettings.component';
import { WpInstComposeComponent } from './wp-inst-compose/wp-inst-compose.component';
// import { BroadcastReportComponent } from './broadcast-report/broadcast-report.component';

// import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
// import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
// import { NkhReportsComponent } from './nkh-reports/nkh-reports.component';
import { OutboundWallboardComponent } from './outbound-wallboard/outbound-wallboard.component';
import { QLoginLogoutComponent } from './q-login-logout/q-login-logout.component';
// import { VideosBlogComponent } from './videos-blog/videos-blog.component';
// import { WebinarSettingsComponent } from './webinar-settings/webinar-settings.component';
import { WebinarComponent } from './webinar/webinar.component';
import { MessageTemplatesComponent } from './message-templates/message-templates.component';
import { CallTariffComponent } from './call-tariff/call-tariff.component';
import { EmailGroupsComponent } from './email-groups/email-groups.component';
import { BulkEmailComponent } from './bulk-email/bulk-email.component';
import { CallTariffsReportComponent } from './call-tariffs-report/call-tariffs-report.component';
import { BillingGroupComponent } from './billing-group/billing-group.component';
// import { CustomWallboardFiveComponent } from './custom-wallboard-five/custom-wallboard-five.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AgentGroupsComponent } from './agent-groups/agent-groups.component';
// import { CampaignContactPopupComponent } from './campaign-contact-popup/campaign-contact-popup.component';
import { BulkMailListComponent } from './bulk-mail-list/bulk-mail-list.component';
import { TicketSignatureComponent } from './ticket-signature/ticket-signature.component';
import { TicketTemplateComponent } from './ticket-template/ticket-template.component';
import { SmsServicesComponent } from './sms-services/sms-services.component';
import { SmsTicketingComponent } from './sms-ticketing/sms-ticketing.component';
import { SmsTicketingListComponent } from './sms-ticketing-list/sms-ticketing-list.component';
import { EmailSettingsComponent } from './email-settings/email-settings.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SpamListComponent } from './spam-list/spam-list.component';
import { EmailsUnassignedComponent } from './emails-unassigned/emails-unassigned.component';
import { EmailDashboardComponent } from './email-dashboard/email-dashboard.component';
// import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
// import { NgxSpinnerModule } from "ngx-spinner";  

// import { CustomWallboardSixComponent } from './custom-wallboard-six/custom-wallboard-six.component';
// import { NetwrixReportComponent } from './netwrix-report/netwrix-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomWall2Component } from './custom-wall2/custom-wall2.component';
import { EditContactDupComponent } from './edit-contact-dup/edit-contact-dup.component';
import { OverallReportComponent } from './overall-report/overall-report.component';
import { AddCallersIdComponent } from './add-callers-id/add-callers-id.component';
import { SsoSettingsComponent } from './sso-settings/sso-settings.component';
import { OmniContactsComponent } from './omni-contacts/omni-contacts.component';
import { NewEditContactsComponent } from './new-edit-contacts/new-edit-contacts.component';
import { CallActivityReportComponent } from './call-activity-report/call-activity-report.component';
import { HpAgentWallComponent } from './hp-agent-wall/hp-agent-wall.component';
import { CxAgentListComponent } from './cx-agent-list/cx-agent-list.component';
import { CxWebclientComponent } from './cx-webclient/cx-webclient.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import { ArchwizardModule } from 'angular-archwizard';
import { AgentSettingCloneComponent } from './agent-setting-clone/agent-setting-clone.component';
import { SsoSettingsCloneComponent } from './sso-settings-clone/sso-settings-clone.component';
import { PbxSettingsCloneComponent } from './pbx-settings-clone/pbx-settings-clone.component';
import { UpgradesComponent } from './upgrades/upgrades.component';
import { ZohoBridgeComponent } from './zoho-bridge/zoho-bridge.component';
import { CustomWallboard12Component } from './custom-wallboard12/custom-wallboard12.component';
import { ConsolidateReportComponent } from './consolidate-report/consolidate-report.component';
import { CallTicketsComponent } from './call-tickets/call-tickets.component';
import { ViewCallTicketsComponent } from './view-call-tickets/view-call-tickets.component';
import { RecordingRatingComponent } from './recording-rating/recording-rating.component';
import { TestComponent } from './test/test.component';
import { PowerBiComponent } from './power-bi/power-bi.component';
import { MrvoipApiComponent } from './mrvoip-api/mrvoip-api.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignContactPopupComponent } from './campaign-contact-popup/campaign-contact-popup.component';
import { PredictiveDialerContactComponent } from './predictive-dialer-contact/predictive-dialer-contact.component';
import { DndComponent } from './dnd/dnd.component';
import { InvalidCampaignContactComponent } from './invalid-campaign-contact/invalid-campaign-contact.component';
import { CampaignContactsComponent } from './campaign-contacts/campaign-contacts.component';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { LinechatComponent } from './linechat/linechat.component';
import { TeleChatComponent } from './tele-chat/tele-chat.component';
import { FaxComponent } from './fax/fax.component';
import { NewOutboundFaxComponent } from './new-outbound-fax/new-outbound-fax.component';
import { WebinarSettingsComponent } from './webinar-settings/webinar-settings.component';
import { WallboardWebsiteComponent } from './wallboard-website/wallboard-website.component';
import { ReportMapComponent } from './report-map/report-map.component';
import { HeatMapReportComponent } from './heat-map-report/heat-map-report.component';
import { Customwallboard11Component } from './customwallboard11/customwallboard11.component';
import { PredictiveActivityComponent } from './predictive-activity/predictive-activity.component';
import { SocketComponent } from './socket/socket.component';
import { SerRestartComponent } from './ser-restart/ser-restart.component';
import { TestReportComponent } from './test-report/test-report.component';
import { QueuetestComponent } from './queuetest/queuetest.component';
// import { ButtonsModule } from "@progress/kendo-angular-buttons";
// import { DialogsModule } from "@progress/kendo-angular-dialog";
// const config = new AuthServiceConfig([
//     {
//       id: FacebookLoginProvider.PROVIDER_ID,
//       provider: new FacebookLoginProvider('228820218341303')
//     }
//   ]);
  
//   export function provideConfig() {
//     return config;
//   }
const appRoutes: Routes = [
    {
        path :'', component:ProfileComponent
    },{
        path : 'predictive-activity',component:PredictiveActivityComponent
    },{
        path : 'service_restart',component:SerRestartComponent
    },
    { 
        path : 'line-chat', component:LinechatComponent
    },
    {
        path :'zoho-bridge', component:ZohoBridgeComponent
    },
    {
        path :'report-maps', component:ReportMapComponent
    },{
        path : 'report-map',component:HeatMapReportComponent
    },
    {
        path :'mrvoip-apis', component:MrvoipApiComponent
    },
    {
        path :'dashboard', component:DashboradComponent
    },{
        path :'login', component:LoginComponent
    },{
        path :'forgot-pwd', component:ForgotPwdComponent
    },{
        path :'profile', component:ProfileComponent
    },{
        path :'agents', component:AgentsComponent
    },{
        path :'call', component:CallComponent
    },{
        path :'call-history', component:CallHistoryComponent
    },{
        path :'mc', component:McComponent
    },
    {
        path :'queue', component:QueueManagementComponent
    },
    {
        path :'pbc-settings', component:PbcSettingsComponent
    },
    {
        path :'admin-settings', component:AdminSettingsComponent
    },
    {
        path :'logout', component:LogoutComponent
    },
    {
        path :'power-pi', component:PowerBiComponent
    },
    {
        path :'sms', component:SmsComponent
    },
   
    {
        path :'old-contacts', component:ContactsComponent
    },
    {
        path :'old-edit-contacts', component:EditContactsComponent
    },
    {
        path :'add-contacts', component:AddContactsComponent
    },
    // {
    //     path :'tabs', component:TabsComponent
    // },
    {
        path :'activity', component:ActivityComponent
    },
    {
        path :'csv-contact-upload', component:CsvContactUploadComponent
    },
    {
        path :'contact-report', component:ContactReportComponent
    },
    {
        path :'compose-sms', component:ComposeSmsComponent
    },
    {
        path :'ticketing-system', component:TicketingSystemComponent
    },
    {
        path :'ticket-view', component:TicketViewComponent
    },
    {
        path :'ticket-compose', component:TicketComposeComponent
    },
    {
        path :'ticket-report', component:TicketReportComponent
    },
    {
        path :'department', component:DepartmentComponent
    },
    {
        path :'chat', component:ChatComponent
    },
    {
        path :'ticketing-system-new', component:TicketingSystemNewComponent
    },
    {
        path :'ticket-forward', component:TicketForwardComponent
    },
    {
        path :'chatbot', component:ChatbootAiComponent
    },
    {
        path :'chatbot-question-feed', component:ChatbotQuestionFeedComponent
    },
    {
        path :'ticket-view-thread', component:TicketViewThreadComponent
    },
    {
        path :'ticket-create-new', component:TicketCreateNewComponent
    },
    {
        path :'wp-chat', component:WhatsappChatComponent
    },
    {
        path :'aux-code', component:AuxCodeComponent
    },
    {
        path :'app-settings', component:AppSettingsComponent
    },
    {
        path :'questionnaire', component:QuestionnaireComponent
    },
    {
        path :'wallboard', component:WallboardComponent
    },
    {
        path :'global-settings', component:GlobalSettingsComponent
    },
    {
        path :'aux', component:AuxCodesComponent
    },
    {
        path :'aux-report', component:AuxCodeReportComponent
    },
    // {
    //     path :'campaign', component:CampaignComponent
    // },
    // {
    //     path :'campaign-contact', component:CampaignContactsComponent
    // },
    // {
    //     path :'campaign-contact-add', component:CampaignContactsAddComponent
    // },
    // {
    //     path :'campaign-contact-edit', component:CampaignContactsEditComponent
    // },
    {
        path :'agent-permission', component:AgentPermissionComponent
    },
    {
        path :'call-report', component:CallReportComponent
    },
    {
        path :'leads', component:LeadManagementComponent
    },
    {
        path :'log-report', component:LogReportComponent
    },
    {
        path :'custom-wall', component:CustomWallboardComponent
    },
    {
        path :'sms-groups', component:SmsGroupsComponent
    },
    {
        path :'assign-tickets', component:UnassignedTicketsComponent
    },
    {
        path :'custom-wall-2', component:CustomWallboardTwoComponent
    },
    {
        path :'sms-csv-upload', component:SmsCsvUploadComponent
    },
    // {
    //     path :'ipc-report', component:IpcReportComponent
    // },
    // {
    //     path :'sp-report', component:SpReportComponent
    // },
    // {
    //     path :'avaya-report', component:AvayaReportComponent
    // },
    // {
    //     path :'custom-wall-3', component:CustomWallboardThreeComponent
    // },
    {
        path :'marketplace', component:MarketPlaceComponent
    },
    {
        path :'sms-templates', component:SmsTemplatesComponent
    },
    // {
    //     path :'custom-wall-4', component:CustomWallboardFourComponent
    // },
    // {
    //     path :'marketplace-wall', component:MarketplaceWallboardComponent
    // },
    // {
    //     path :'marketplace-report', component:MarketplaceCustomReportComponent
    // },
    // {
    //     path :'demo-page', component:DemoPageComponent
    // },
    {
        path :'upload-document', component:UploadDocumentsComponent
    },
    {
        path :'socket', component:SocketComponent
    },
    {
        path :'download-document', component:DocumentDownloadComponent
    },
    {
        path :'fb-chat', component:FbChatComponent
    },
    {
        path :'agent-settings', component:AgentSettingaComponent
    },
    {
        path :'chat-ratings', component:ChatRatingsComponent
    },
    {
        path :'survey-report', component:SurveyReportComponent
    },
    {
        path :'survey-summary-report', component:SurveySummaryReportComponent
    },
    {
        path :'chat-widget-settings', component:ChatWidgetSettingsComponent
    },
    {
        path :'fax', component:FaxComponent
    },
    {
        path :'outbound-fax', component:NewOutboundFaxComponent
    },
    {
        path :'internal-chat', component:InternalChatComponent
    },
    {
        path :'compose-wp', component:ComposeWpComponent
    },
    // {
    //     path :'invalid-campaign-contact', component:InvalidCampaignContactComponent
    // },
    // {
    //     path :'predictive-wrapups', component:DndComponent
    // },
    // {
    //     path :'fax-admin', component:FaxAdministrationComponent
    // },
    // {
    //     path :'cordlife-contact', component:CardlifeComponent
    // },
    // {
    //     path :'predictive-dialer-calls', component:PredictiveDialerContactComponent,
    // },
    {
        path :'call-q', component:CallQueueListComponent,
    },
    {
        path :'call-q-m', component:CallQueueManagementComponent
    },{
        path :'tele-chat', component:TeleChatComponent
    },
    // {
    //     path :'social-publish', component:BufferMarketingComponent
    // },{
    //     path :'line-chat', component:LineChatComponent
    // },{
    //     path :'tele-chat', component:TeleChatComponent
    // },
    {
        path :'sms-report', component:SmsReportComponent
    },{
        path :'report-admin', component:ReportComponent
    },
    // {
    //     path :'broad-report', component:BroadcastReportComponent
    // },
    {
        path :'sms-tariff', component:SmsTariffComponent
    },
    // {
    //     path :'payment-results', component:PaymentResultsComponent
    // },
    // {
    //     path :'check-out', component:CheckOutComponent
    // },
    {
        path :'add-to-cart', component:AddToCartComponent
    },
    {
        path :'omni-plans', component:AdminPlansComponent
    }, 
    // {
    //     path :'wp-pay', component:WpPayComponent
    // },
    {
        path :'wp-unoff', component:WhatsappUnoffComponent
    },{
        path :'wp-settings', component:WpintsettingsComponent
    },{
        path :'wp-comp-unoff', component:WpInstComposeComponent
    },
    // {
    //     path :'admin-requests', component:AdminRequestsComponent
    // },{
    //     path :'nkh-reports', component:NkhReportsComponent
    // },
    {
        path :'outbound-wallboard', component:OutboundWallboardComponent
    },
    // {
    //     path :'vid-blog', component:VideosBlogComponent
    // },
    {
        path :'webinar', component:WebinarComponent
    },
    {
        path :'webinar-settings', component:WebinarSettingsComponent
    },
    {
        path :'message-temp', component:MessageTemplatesComponent
    },{
        path :'call-tariff', component:CallTariffComponent
    },{
        path :'email-groups', component:EmailGroupsComponent
    },{
        path :'call-tarriff-reports', component:CallTariffsReportComponent
    },{
        path :'email-bulk', component:BulkEmailComponent
    },{
        path :'billing-group', component:BillingGroupComponent
    },
    // {
    //     path :'custom-wall-5', component:CustomWallboardFiveComponent
    // },
    {
        path :'agent-group', component:AgentGroupsComponent
    },
    // {
    //     path :'campaign-contact-details', component:CampaignContactPopupComponent
    // },
    {
        path :'bulk-mail-list', component:BulkMailListComponent
    },
    // {
    //     path :'cust_six__wall', component:CustomWallboardSixComponent
    // },{
    //     path :'netwrix-report', component:NetwrixReportComponent
    // }
    {
        path :'ticket-sign', component:TicketSignatureComponent
    },{
        path :'ticket-template', component:TicketTemplateComponent
    },{
        path :'sms-ticket', component:SmsTicketingComponent
    },{
        path :'sms-ticket-list', component:SmsTicketingListComponent
    },{
        path :'spam-list', component:SpamListComponent
    },{
        path :'email-settings',component:EmailSettingsComponent
    },
    // {
    //     path :'custom-wall2',component:CustomWall2Component
    // },
    {
        path :'custom-wall2',component:HpAgentWallComponent
    },
    {
        path :'unassinged-tickets',component:EmailsUnassignedComponent
    },{
        path :'email-dashboard',component:EmailDashboardComponent
    },
    {
        path :'edit-contacts-dup', component:EditContactDupComponent
    },
    {
        path :'overall-report', component:OverallReportComponent
    },
    {
        path :'callers-id', component:AddCallersIdComponent
    },
    {
        path :'sso-settings', component:SsoSettingsComponent
    },
    {
        path :'contacts', component:OmniContactsComponent
    },
    {
        path :'edit-contacts', component:NewEditContactsComponent
    },{
        path :'call-activity', component:CallActivityReportComponent
    },{
        path :'cx-agent', component:CxAgentListComponent
    },{
        path :'cx-webclient', component:CxWebclientComponent
    },{
        path :'update', component:UpgradeComponent
    },
    {
        path :'agent-settingss', component:AgentSettingCloneComponent
    },{
        path :'sso-sett', component:SsoSettingsCloneComponent
    },{
        path :'pbx-sett', component:PbxSettingsCloneComponent
    },{
        path :'custom-wall-12', component:CustomWallboard12Component
    },{
        path :'consolidate-report', component:ConsolidateReportComponent
    },{
        path :'call-tickets', component:CallTicketsComponent
    },{
        path :'view-call-tickets', component:ViewCallTicketsComponent
    },{
        path :'agent-call-survey', component:RecordingRatingComponent
    },{
        path :'testing', component:TestComponent
    },
    {
        path :'invalid-campaign-contact', component:InvalidCampaignContactComponent
    },
    {
        path :'predictive-wrapups', component:DndComponent
    },{
        path :'campaign', component:CampaignComponent
    },
    {
        path :'campaign-contact', component:CampaignContactsComponent
    },
    {
        path :'predictive-dialer-calls', component:PredictiveDialerContactComponent,
    }
    ,{
        path :'facebook-login', component:FacebookLoginComponent
    },
    {
        path :'fb-chat', component:FbChatComponent
    },
    {
        path :'custom-wall13', component:WallboardWebsiteComponent
    },{
        path : 'custom-wall14',component:Customwallboard11Component
    },{
        path : 'custom-report',component:QueuetestComponent
    },{
        path : 'monthly-report',component:TestReportComponent
    }

];

    
@NgModule({
  declarations: [
    SafePipe,
    AppComponent,
    McComponent,
    MenuComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    ForgotPwdComponent,
    ProfileComponent,
    AgentsComponent,
    AgentsformComponent,
    QueueComponent,
    CallComponent,
    CallHistoryComponent,
    ChatComponent,
    EmailComponent,
    DialpadComponent,
    DashboradComponent,
    SettingMenuComponent,
    LogoutComponent,
    QueueformComponent,
    PbcSettingsComponent,
    AdminSettingsComponent,
    SmsComponent,
    ContactsComponent,
    AddContactsComponent,
    EditContactsComponent,
    ActivityComponent,
    TestReportComponent,
    QueuetestComponent,
    // TabsComponent,
    CsvContactUploadComponent,
    ContactReportComponent,
    ComposeSmsComponent,
    TicketingSystemComponent,
    TicketViewComponent,
    TicketComposeComponent,
    DepartmentComponent,
    TicketReportComponent,
    TicketingSystemNewComponent,
    TicketForwardComponent,
    ChatbootAiComponent,
    ChatbotQuestionFeedComponent,
    TicketViewThreadComponent,
    TicketCreateNewComponent,
    WhatsappChatComponent,
    AuxCodeComponent,
    AppSettingsComponent,
    QuestionnaireComponent,
    WallboardComponent,
    GlobalSettingsComponent,
    AuxCodesComponent,
    AuxCodeReportComponent,
    // CampaignComponent,
    // CampaignContactsComponent,
    // CampaignContactsAddComponent,
    // CampaignContactsEditComponent,
    AgentPermissionComponent,
    CallReportComponent,
    QueueManagementComponent,
    LeadManagementComponent,
    LogReportComponent,
    CustomWallboardComponent,
    SmsGroupsComponent,
    UnassignedTicketsComponent,
    CustomWallboardTwoComponent,
    SmsCsvUploadComponent,
    // IpcReportComponent,
    // SpReportComponent,
    // AvayaReportComponent,
    // CustomWallboardThreeComponent,
    MarketPlaceComponent,
    SmsTemplatesComponent,
    // CustomWallboardFourComponent,
    // MarketplaceWallboardComponent,
    // MarketplaceCustomReportComponent,
    // DemoPageComponent,
    UploadDocumentsComponent,
    DocumentDownloadComponent,
    FbChatComponent,
    AgentSettingaComponent,
    ChatRatingsComponent,
    SurveyReportComponent,
    SurveySummaryReportComponent,
    ChatWidgetSettingsComponent,
    // FaxComponent,
    // NewOutboundFaxComponent,
    // TestComponent,
    ReportComponent,
    InternalChatComponent,
    ComposeWpComponent,
    // InvalidCampaignContactComponent,
    // DndComponent,
    // FaxAdministrationComponent,
    FooterComponent,
    // CardlifeComponent,
    // PredictiveDialerContactComponent,
    CallQueueComponent,
    CallQueueListComponent,
    CallQueueManagementComponent,
    // BufferMarketingComponent,
    // LineChatComponent,
    // TeleChatComponent,
    SmsReportComponent,
    SmsTariffComponent,
    // PaymentResultsComponent,
    // CheckOutComponent,
    AddToCartComponent,
    AdminPlansComponent,
    // WpPayComponent,
    WhatsappUnoffComponent,
    WpintsettingsComponent,
    WpInstComposeComponent,
    // BroadcastReportComponent,
    // AdminRequestsComponent,
    // NkhReportsComponent,
    OutboundWallboardComponent,
    QLoginLogoutComponent,
    // VideosBlogComponent,
    // WebinarSettingsComponent,
    WebinarComponent,
    MessageTemplatesComponent,
    CallTariffComponent,
    EmailGroupsComponent,
    BulkEmailComponent,
    CallTariffsReportComponent,
    BillingGroupComponent,
    // CustomWallboardFiveComponent,
    AgentGroupsComponent,
    // CampaignContactPopupComponent,
    BulkMailListComponent,
    TicketSignatureComponent,
    TicketTemplateComponent,
    SmsServicesComponent,
    SmsTicketingComponent,
    SmsTicketingListComponent,
    EmailSettingsComponent,
    SpamListComponent,
    CustomWall2Component,     
    EmailsUnassignedComponent,  
    EmailDashboardComponent, EditContactDupComponent, OverallReportComponent, AddCallersIdComponent, SsoSettingsComponent, OmniContactsComponent, NewEditContactsComponent, CallActivityReportComponent, HpAgentWallComponent, CxAgentListComponent, CxWebclientComponent, UpgradeComponent, AgentSettingCloneComponent, SsoSettingsCloneComponent, PbxSettingsCloneComponent, UpgradesComponent, ZohoBridgeComponent, CustomWallboard12Component, ConsolidateReportComponent, CallTicketsComponent, ViewCallTicketsComponent, RecordingRatingComponent, TestComponent, PowerBiComponent, MrvoipApiComponent, CampaignComponent, CampaignContactPopupComponent, PredictiveDialerContactComponent, DndComponent, InvalidCampaignContactComponent, CampaignContactsComponent,
    EmailDashboardComponent, EditContactDupComponent, OverallReportComponent, AddCallersIdComponent, SsoSettingsComponent, OmniContactsComponent, NewEditContactsComponent, CallActivityReportComponent, HpAgentWallComponent, CxAgentListComponent, CxWebclientComponent, UpgradeComponent, AgentSettingCloneComponent, SsoSettingsCloneComponent, PbxSettingsCloneComponent, UpgradesComponent, ZohoBridgeComponent, CustomWallboard12Component, ConsolidateReportComponent, CallTicketsComponent, ViewCallTicketsComponent, RecordingRatingComponent, TestComponent, PowerBiComponent, MrvoipApiComponent, FacebookLoginComponent, LinechatComponent, TeleChatComponent, FaxComponent, NewOutboundFaxComponent, WebinarSettingsComponent, WallboardWebsiteComponent, HeatMapReportComponent, Customwallboard11Component,PredictiveActivityComponent, SocketComponent, SerRestartComponent
    // CustomWallboardSixComponent,
    // NetwrixReportComponent,
    // ButtonsModule, DialogsModule
    
  
  ],
  imports: [
    BrowserModule,CommonModule,
    ReactiveFormsModule,FormsModule,
    HttpClientModule,EditorModule,  
    // SocialLoginModule,
    // UserIdleModule.forRoot({idle: 10, timeout: 10, ping: 10}),
    RouterModule.forRoot(appRoutes,{ useHash: true }),NgbModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireMessagingModule,
    // RichTextEditorAllModule,
    InfiniteScrollModule,
    NoopAnimationsModule,
    MatChipsModule,
    MatInputModule, MatIconModule,DragDropModule,ArchwizardModule
  ],
  providers: [DatePipe,
//     {
//     provide: AuthServiceConfig,
//     useFactory: provideConfig
//   },
  Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
