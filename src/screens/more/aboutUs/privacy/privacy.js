import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Switch } from 'react-native';
import { Images, Colors } from '../../../../theme';
import styles from './styles'
import { hp, wp } from '../../../../utils/heightWidthRatio';

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view : [1],
    };
  }

  render() {
    const { view } = this.state
    return (
      <View style={styles.mainContainer}>

        <View style={styles.container}>
          <View style={styles.headerView}>
            <View style={{flexDirection : 'row', alignItems:'center'}}>
              <TouchableOpacity onPress={()=>this.props.navigation.goBack()} style={styles.centerView}>
                <Image style={[styles.smallIcon, {marginLeft:0}]} source={Images.backButton} />
              </TouchableOpacity>
              <Text style={styles.title}>About Us</Text>
            </View> 
            <TouchableOpacity onPress={() => this.props.navigation.navigate('notification')}> 
              <Image style={styles.backIcon} source={Images.notification} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.locationContainer}>
          <View style={{flex:1}}>

            <FlatList
              data={view}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item, index}) => (
                <View>

                  <Text style={styles.titleBlack}>Privacy Policy</Text>

                  <Text style={styles.grayContent}>
                    WAYBUS platforms "Website, Mobile site and Mobile Apps" , you are accepting and consenting to the practices described in this Privacy Notice as defined here in after. This document describes the privacy policy("Privacy Notice") of WAYBUS Private Limited WAYBUS is designed to explain guest users or registered users of the Website, Mobile site and Mobile Apps, Mobile site and Mobile Apps including(without limitation) buyers of bus tickets, customers who are using our bus booking facility, bus partners, bus ticket booking agents, intermediaries who sell services on the Website, Mobile site and Mobile Apps, other users/visitors of the Website, Mobile site and Mobile Apps what data/information we collect, why we collect it, and what we do with it. Your use of and access to the Website, Mobile site and Mobile Apps and the services provided through the Website, Mobile site and Mobile Apps and mobile site, mobile app and other offline channels including call centers and offices are subject to this Privacy Notice and our Terms and Conditions. Any capitalized term used but not defined in this Privacy Notice shall have the meaning attributed to it in our Terms and Conditions. This Privacy Notice is applicable all persons including persons/entities who purchase, intend to purchase or inquire about any product or service made available by WAYBUS through the Website, Mobile site and Mobile Apps and Other Interfaces(collectively "Services") .If you disagree with any provision contained in this Privacy Notice, then please do not use or access the Website, Mobile site and Mobile Apps or Other Interfaces or avail any of the Services. By using or accessing the Website, Mobile site and Mobile Apps or Other Interfaces, the User hereby agrees with the Privacy Policy in its entirety and the contents here in.
                  </Text>
                  <Text style={styles.grayContent}>
                    WAYBUS Private Limited provides a technology platform for online bus ticketing that connects intending travellers with bus partners. WAYBUS does not own or operate or offer the services of transportation to the user. WAYBUS also doesn’t act as an agent of any bus partner in the process of providing the above-mentioned technology platform services. WAYBUS acts as a marketplace facilitating booking of railways tickets and therefore, neither influences nor controls the booking flow, scheduling/rescheduling, confirmation from Waitlisted or RAC to confirmed, cancellations or other changes to the delivery timelines or other related aspects of the railway tickets on offer, delays, meal and berth preferences or any other lack or deficiency of services. WAYBUS is merely a platform to search for desired bus tickets to be booked through WAYBUS. All bookings or bus reservations made through WAYBUS are subject to the applicable Terms & Conditions.
                  </Text>
                  

                  <Text style={styles.blackContent}>
                    A. INFORMATION YOU PROVIDE TO US AND ITS USE AND SHARING
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      a. We receive and store any information you enter on our Website, Mobile site and Mobile Apps or give us in any other way. In general, you can browse the Website, Mobile site and Mobile Apps without telling us who you are or revealing any personal information about you. Once you give us your rsonal information, you are not anonymous to us.
                    </Text>
                    <Text style={styles.grayContent}>
                      b. We collect personally identifiable information (email address, other addresses,name, phone number, gender, travel preferences, travel plan, telephone (mobile or otherwise) and/or fax numbers. etc.) from you when you register and create an account with us, and that you provide to us from time to time. The information may also include information such as your banking details (including credit/debit card) and any other information relating to your income and/or lifestyle; billing information, payment history etc. (as shared by you) .
                    </Text>
                    <Text style={styles.grayContent}>
                      c. Further, we may collect certain other information, including (without limitation) the following information, while you
                    </Text>
                    
                    <View style={styles.leftSpacing}>
                      <Text style={styles.grayContent}>
                        1. use the Website, Mobile site and Mobile Apps and/or
                      </Text>
                      <Text style={styles.grayContent}>
                        2. access any service made available by WAYBUS through the Website, Mobile site and Mobile Apps and Other Interfaces:
                      </Text>

                      <View style={styles.leftSpacing}>
                        <Text style={styles.grayContent}>
                          a. data either created by you or by a third party and which you wish to store on our servers such as image files, documents etc.;
                        </Text>
                        <Text style={styles.grayContent}>
                          b. transactional history (other than banking details) about your e-commerce activities, buying behaviour on the Website, Mobile site and Mobile Apps and Other Interfaces;
                        </Text>
                      </View>  

                      <Text style={styles.grayContent}>
                        3. user names, passwords, email addresses and other security-related information used by you in relation to the Services;
                      </Text>
                      <Text style={styles.grayContent}>
                        4. data available in public domain or received from any third party including social media networks, including but not limited to personal or non-personal information from your linked social media networks as a part of your account information and
                      </Text>
                      <Text style={styles.grayContent}>
                        5. information pertaining to persons(s) /traveller(s) for whom booking are made through the Website, Mobile site and Mobile Apps and Other Interfaces.
                      </Text>
                      
                    </View>
                    
                    <Text style={styles.grayContent}>
                      d. Such information collected by us may include information considered to be ‘sensitive personal information’ of the user under the Information Technology (Reasonable security practices and procedures and sensitive personal data or information) Rules, 2011 ("SPIRules") . Such ‘sensitive personal information’ generally includes user’s information relating to password, financial information such as bank account or credit card or debit card or other payment instrument details, physical, physiological and mental health condition, sexual orientation, medical records and history, and biometric information. Further, the SPI Rules require your express consent to collect, store and use such personally identifiable information collected by us. You hereby consent to such use, collection, storage and disclosure of ‘sensitive personal information’ by us inaccordance with this Privacy Notice as required under applicable law.
                    </Text>
                    <Text style={styles.grayContent}>
                      e. Where possible, we indicate the fields which are required and the fields which are optional. You [always] have the option to not provide information by choosing not to use a particular service or feature on the Website, Mobile site and Mobile Apps. You [always] have the option to withdraw your consent, upon which we have the option not to provide services for which the consent was sought.
                    </Text>
                    <Text style={styles.grayContent}>
                      f. In case you are booking bus tickets, on the Website, Mobile site and Mobile Apps and/or through Other Interfaces for and/or on behalf of other persons, you here by confirm and represent that each ofsuch other person(s) /traveller(s) for whom a booking has been made, has agreed to have the information shared by you disclosed to us and further be shared by us with the concerned service provider(s) .
                    </Text>
                    <Text style={styles.grayContent}>
                      g. While making a booking, we may use ‘sensitive personal information’ including, payment details which include card holder name, credit/debit card number (in encrypted form) with an expiration date, banking details, wallet details etc., as shared and allowed to be stored by you. We may also use the information of travellers list as available in or linked with your account. This information is presented to the user at the time of making a booking to enable you to complete your bookings expeditiously. Further, we may use your ‘sensitive personal information’ to provide seamless and convenient services and such uses will include (without limitation)
                    </Text>
                    <View style={styles.leftSpacing}>
                      <Text style={styles.grayContent}>
                        1. confirmation of your reservations/bookings with you and respective service providers,
                      </Text>
                      <Text style={styles.grayContent}>
                        2. informing of the transaction status,
                      </Text>
                      <Text style={styles.grayContent}>
                        3. communicating booking confirmations either via electronic means or other messaging service,
                      </Text>
                      <Text style={styles.grayContent}>
                        4. communicating any updates or changes to your booking(s) ,
                      </Text>
                      <Text style={styles.grayContent}>
                        5. enabling customer service team to contact you, if necessary
                      </Text>
                      <Text style={styles.grayContent}>
                        6. customize the content of the Website, Mobile site and Mobile Apps and other Interfaces;
                      </Text>
                      <Text style={styles.grayContent}>
                        7. request for reviews of the Services or any other improvements;
                      </Text>
                      <Text style={styles.grayContent}>
                        8. sending verification message(s) or email(s) ,
                      </Text>
                      <Text style={styles.grayContent}>
                        9. validating/authenticating your account and to prevent any misuse or abuse and
                      </Text>
                      <Text style={styles.grayContent}>
                        10. contact you to offer offers. Further to the above, your information will be shared with the end service providers like bus service providers or any other suppliers who are responsible for fulfilling your booking. We may employ other companies and individuals to perform functions on our behalf (including but not limited to payment processing, data hosting, and data processing platforms) . We may also share certain information to our corporate affiliates or business partners who may contact the customers to offer certain products or services, which may include free or paid products/services (like travel insurance, discount coupons, entertainment services) , which will enable the customer to have better travel experience or to avail certain benefits specially made for WAYBUS customers. We may provide anonymous statistical information based on this data to suppliers, advertisers, affiliates and other current and potential business partners. You may note that while making a booking with WAYBUS you authorize us to share your information with the said service providers and suppliers. WAYBUS does not authorize the end service provider to use your information for any other purpose(s) except as may be for fulfilling their part of service. Nevertheless, the information shared with such service providers/suppliers is beyond the purview and control of WAYBUS, and hence we are not accountable for any unauthorized use of such information by any service provider/supplier. You are therefore advised to review the privacy policies of the respective service provider or supplier whose services you choose to avail.
                      </Text>
                    </View>  


                    <Text style={styles.grayContent}>
                      h. We may share user information with entities that control, are controlled by or are under the common control with WAYBUS and that are either subject to this Privacy Notice or follow practices at least as protective as those described in this Privacy Notice. Further, we may share user information with our affiliates or associate entities. If the assets and/or business of WAYBUS are acquired, our customer information may also be transferred to the acquirer depending up on the nature of such acquisition. In addition, as part ofbusiness expansion/development/restructuring or for any other reason whatsoever, if we decide to sell/transfer/assign our business, any part thereof, any of our subsidiaries or any business units, then as part of such restructuring exercise customer information including the personal information collected here in shall be transferred accordingly.
                    </Text>
                    <Text style={styles.grayContent}>
                      i. We use non-identifiable information in aggregate or anonymized form to build higher quality, more useful online services by performing statistical analysis of the collective characteristics and behaviour of our customers and visitors.
                    </Text>
                    <Text style={styles.grayContent}>
                      j. We receive and store certain types of information whenever you interact with us. We may also receive/store information about your location and your mobile device, including a unique identifier for your device. We may use this information for internal analysis and provide you with location-based services, such as search results and other personalized content. We may automatically track certain information about you based upon your behaviour on our Website, Mobile site and Mobile Apps. We use this information to do internal research on our users’ demographics, interests, and behaviour to better understand, protect and serve you. This information is compiled and analysed on an aggregated basis. This information may include your login, e-mail address, password, computer and connection information such as browser type and version, operating system and platform, transaction history, which we sometimes aggregate with similar information from other customers to create customized or additional features, the full uniform resource locators (URL) click stream to, through and from our Website, Mobile site and Mobile Apps (including date and time) , cookie number, travel routes, service providers, bus partners you viewed or searched for, and any phone number used to call our customer service number.
                    </Text>
                    <Text style={styles.grayContent}>
                      k. We may also use browser data such as cookies, flash cookies (also known as ‘flash local shared objects’) , or similar data on certain parts of our Website, Mobile site and Mobile Apps for fraud prevention and other purposes. During some visits, we may use software tools such as JavaScript to measure and collect session information, including page response times, download errors, length of visits to certain pages, page interaction information (such as scrolling, clicks, and mouse-overs) , and methods used to browse away from the page.
                    </Text>
                    <Text style={styles.grayContent}>
                      l. If you choose to post messages on our message boards, chat rooms or other message areas or leave feedback, we will collect that information you provide to us. We retain this information as necessary to resolve disputes, provide customer support and troubleshoot problems as permitted by law.
                    </Text>
                    <Text style={styles.grayContent}>
                      m. We might receive information about you from other sources and add it to our account information. If other users or third parties send us correspondence about your activities, we may collect such information into a file specific to you.
                    </Text>
                    <Text style={styles.grayContent}>
                      n. We release account and other personal information when we believe release is appropriate to comply with the law, enforce or apply our Terms and Conditions and other agreements, or protect the rights, property or safety of WAYBUS, our users or others. This includes exchanging information with other companies, organisations, government or regulatory authorities for fraud protection and credit risk reduction. However, this does not include selling, renting, sharing or otherwise disclosing personally identifiable information from customers for commercial purposes in a way that is contrary to our commitments under this Privacy Notice.
                    </Text>
                    <Text style={styles.grayContent}>
                      o. In addition to the circumstances described above, WAYBUS may disclose the information if required to do so by law, required by any enforcement authority for investigation, required by court order or in reference to any legal process and regulatory, required for internal compliance and audit exercise or required for protecting the rights and business of WAYBUS.
                    </Text>
                    <Text style={styles.grayContent}>
                      p. Other than as set out above, you will receive notice when information about you might go to third parties and you will have an opportunity to choose not to share the information. Whenever we transfer personal information to countries outside India in the course of sharing information as set out above, we will ensure that the information is transferred in accordance with this Privacy Notice and as permitted by the applicable laws including but not limited to Information Technology Act, 2000 and the rules framed there under.
                    </Text>
                   
                  </View>  

                  <Text style={styles.blackContent}>
                    B. PERMISSIONS REQUIRED FOR USING OUR MOBILE APPLICATIONS
                  </Text>
                    <View style={styles.leftSpacing}>
                      <Text style={styles.blackContent}>
                        1. ANDROID PERMISSIONS:
                      </Text>

                      <View style={styles.leftSpacing}>
                        <Text style={styles.grayContent}>
                          a. Device and App History: We need your device permission to get information about your device, like OS (operating system) name, OS version, mobile network, hardware model, unique device identifier, preferred language, etc. Basis these inputs, we intend to optimize your travel booking experience.
                        </Text>
                        <Text style={styles.grayContent}>
                          b. Identity: This permission enables us to know about details of your account(s) on your mobile device. We use this info to auto-fill your email ID’s and provide a typing free experience. It also helps us map email ID’s to a particular user to give you the benefit of exclusive travel offers, wallet cashbacks, etc. It also allows facilitating your Facebook and Google+ login.
                        </Text>
                        <Text style={styles.grayContent}>
                          c. SMS: If you allow us to access your SMS, we read your SMS to autofill or prepopulate ‘OTP’ while making a transaction and to validate your mobile number. This provides you with a seamless purchase experience while making a booking and you don’t need to move out of the app to read the SMS and then enter it in the app.
                        </Text>
                        <Text style={styles.grayContent}>
                          d. SMS: If you allow us to access your SMS, we read your SMS to autofill or prepopulate ‘OTP’ while making a transaction and to validate your mobile number. This provides you with a seamless purchase experience while making a booking and you don’t need to move out of the app to read the SMS and then enter it in the app.
                        </Text>
                        <Text style={styles.grayContent}>
                          e. Phone: The app requires access to make phone calls so that you can make phone calls to bus partners and our customer contact centers directly through the app.
                        </Text>
                        <Text style={styles.grayContent}>
                          f. Contacts: If you allow us to access your contacts, it enables us to provide a lot of social features to you such as sharing tickets or location with your friends. This permission also allows you to select numbers from your contacts for mobile recharges done on the app.
                        </Text>
                        <Text style={styles.grayContent}>
                          g. Photo/Media/ Files: The libraries in the app use these permissions to allow users to save and upload multimedia reviews.
                        </Text>
                        <Text style={styles.grayContent}>
                          h. Wi-Fi connection information: When you allow us permission to detect your Wi-Fi connection, we optimize your band width usage for multimedia uploads.
                        </Text>
                        <Text style={styles.grayContent}>
                          i. Device ID and Call information: This permission is used to detect your Android ID through which we can uniquely identify users. It also lets us know your contact details using which we pre-populate specific fields to ensure a seamless booking experience.
                        </Text>
                        <Text style={styles.grayContent}>
                          j. Camera: This permission is used to capture pictures of the boarding point or bus before the journey. This image can then upload as part of multimedia reviews.
                        </Text>
                        <Text style={styles.grayContent}>
                          k. Calendar: This permission enables us to put your travel plans on your calendar.
                        </Text>
                      </View>
                      
                      <Text style={styles.blackContent}>
                        2. IOS PERMISSIONS:
                      </Text>

                      <View style={styles.leftSpacing}>
                        <Text style={styles.grayContent}>
                          a. Notifications: If you opt-in for notifications, enables us to send across exclusive deals, promotional offers, travel related updates, etc. on your device. If you do not opt for this, ates for your travel like booking confirmation, a refund (in case of cancellation) , etc. will be sent through SMS. If you opt-in for notifications, enables us to send across exclusive deals, promotional offers, travel related updates, etc. on your device. If you do not opt for this, ates for your travel like booking confirmation, a refund (in case of cancellation) , etc. will be sent through SMS.
                        </Text>
                        <Text style={styles.grayContent}>
                          b. Contacts: This permission enables us to know about the details of your account(s) on your mobile device. We use this info to auto-fill your email ID’s and provide a typing free experience. It also helps us map email ID’s to a particular user to give you the benefit of exclusive travel offers, wallet cashbacks, etc. It also allows facilitating your Facebook and Google+ login.
                        </Text>
                        <Text style={styles.grayContent}>
                          c. Location: This permission enables us to give you the benefit of location-specific deals and provide you with a personalized xperience. When you launch WAYBUS app to make a travel booking, we auto-detect your location so that your nearest city is auto-filled. We also require this permission to be able to help you track your bus with respect to your location.
                        </Text>
                        <Text style={styles.grayContent}>
                          d. Photo/Media/ Files: The libraries in the app use these permissions to allow users to save and upload multimedia reviews.
                        </Text>
                        <Text style={styles.grayContent}>
                          e. Camera: This permission is used to capture pictures of the boarding point or bus before the journey. This image can then upload as part of multimedia reviews.
                        </Text>
                        <Text style={styles.grayContent}>
                          f. Calendar: This permission enables us to put your travel plans on your calendar.
                        </Text>

                      </View>  
                    </View>    
                    
                  <Text style={styles.blackContent}>
                    C. COOKIES
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      1. A ‘cookie’ is a small piece of information stored by a web server on a web browser so it can be later read back from that browser. Cookies are useful for enabling the browser to remember information specific to a given user. We place both permanent and temporary cookies in your computer’s hard drive.
                    </Text>
                    <Text style={styles.grayContent}>
                      2. We use data collection devices such as ‘cookies’ on certain pages of the Website, Mobile site and Mobile Apps to help analyse our web page flow, measure promotional effectiveness, and promote trust and safety. We also use cookies to allow you to enter your password less frequently during a session. Cookies can also help us provide information that is targeted to your interests. Most cookies are "session cookies", meaning that they are automatically deleted from your hard drive at the end of a session. You are always free to decline our cookies if your browser permits, although in that case, you may not be able to use certain features on the Website, Mobile site and Mobile Apps and you may be required to re-enter your password more frequently during a session.
                    </Text>
                    <Text style={styles.grayContent}>
                      3. Additionally, you may encounter "cookies" or other similar devices on certain pages of the Website, Mobile site and Mobile Apps that are placed by third parties. We do not control the use of cookies by third parties.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    D. SECURITY OF YOUR INFORMATION
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      1. We strive to protect the security of your information during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input in addition to maintaining the security of your information as per the International Standard IS/ISO/IEC 27001 on "Information Technology Security Techniques Information Security Management System-Requirements".
                    </Text>
                    <Text style={styles.grayContent}>
                      2. This means all Personal Information you provide is transmitted using TLS (Transport Layer Security) encryption. TSL is a proven coding system that lets your browser automatically encrypt, or scramble, data before you send it to us. Website, Mobile site and Mobile Apps have stringent security measures in place to protect the loss, misuse, and alteration of the information under our control. Whenever you change or access your account information, we offer the use of a secure server. Once your information is in our possession we adhere to strict security guidelines, protecting it against unauthorized access.
                    </Text>
                    <Text style={styles.grayContent}>
                      3. We maintain physical, electronic and procedural safe guards in connection with the collection, storage and dis closure of personal information (including sensitive personal information) . Our security procedures mean that we may occasionally request proof of identity before we disclose personal information to you.
                    </Text>
                    <Text style={styles.grayContent}>
                      4. It is imperative that you have measures to safeguard against unauthorised access to your password and to your computer. Please ensure that you read and understand the terms and conditions which are set out in the Conditions of Use, in this regard.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    E. PERSONS WHO ARE ELIGIBLE TO USE THE WEBSITE, MOBILE SITE AND MOBILE APPS
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      1. Use of the Website, Mobile site and Mobile Apps is available only to persons who can form a legally binding contract under the Indian Contract Act, 1872. If you are a minor, i.e., under the age of 18 years, or do not have the capacity to enter into a legally binding contract, you may use the Website, Mobile site and Mobile Apps only with the involvement of a parent, guardian or a duly authorised person.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    F. MODIFY YOUR PRIVACY PREFERENCES
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      1. As mentioned above, you can choose not to provide information, even though it might be needed to make proper use of the Services or to take advantage of some of the features offered through the Website, Mobile site and Mobile Apps.
                    </Text>
                    <Text style={styles.grayContent}>
                      2. You can add or update certain information on some of the pages of the Website, Mobile site and Mobile Apps, such as your profile. When you update information, we usually keep a copy of the previous version for our records.
                    </Text>
                    <Text style={styles.grayContent}>
                      3. If you do not want to receive e-mail or other mail from us, you will be free to adjust your preferences to reflect the same. However, even in case you do not want to receive Conditions of Use and other legal notices from us, such as this Privacy Notice, all those notices will still govern your use of Website, Mobile site and Mobile Apps and requests placed with us, and it is your responsibility to review them for changes.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    G. Service Providers and suppliers:
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      Your information shall be shared with the end service providers like bus service providers, cab rental or any other suppliers who are responsible for fulfilling your booking. You may note that while making a booking with WAYBUS you authorize us to share your information with the said service providers and suppliers. It is pertinent to note that WAYBUS does not authorize the end service provider to use your information for any other purpose(s) except as may be for fulfilling their part of service. However, how the said service providers/suppliers use the information shared with them is beyond the purview and control of WAYBUS as they process Personal Information as independent data controllers, and hence we cannot be made accountable for the same. You are therefore advised to review the privacy policies of the respective service provider or supplier whose services you choose to avail. WAYBUS does not sell or rent individual customer names or other Personal Information of Users to third parties except sharing of such information with our business / alliance partners or vendors who are engaged by us for providing various referral services and for sharing promotional and other benefits to our customers from time to time basis their booking history with us.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    H. COMPANIES IN THE SAME GROUP:
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      In the interests of improving personalization and service efficiency, we may, under controlled and secure circumstances, share your Personal Information with our affiliate or associate entities. If the assets of WAYBUS are acquired, our customer information may also be transferred to the acquirer depending upon the nature of such acquisition. In addition, as part of business expansion/development/restructuring or for any other reason whatsoever, if we decide to sell/transfer/assign our business, any part thereof, any of our subsidiaries or any business units, then as part of such restructuring exercise customer information including the Personal Information collected herein shall be transferred accordingly.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    I. BUSINESS PARTNERS AND THIRD-PARTY VENDORS:
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      We may also share certain filtered Personal Information to our corporate affiliates or business partners who may contact the customers to offer certain products or services, which may include free or paid products / services, which will enable the customer to have better travel experience or to avail certain benefits specially made for WAYBUS customers. Examples of such partners are entities offering co-branded credit cards, travel insurance, insurance cover against loss of wallet, banking cards or similar sensitive information etc. If you choose to avail any such services offered by our business partners, the services so availed will be governed by the privacy policy of the respective service provider. WAYBUS may share your Personal Information to third party that WAYBUS may engage to perform certain tasks on its behalf, including but not limited to payment processing, data hosting, and data processing platforms. We use non-identifiable Personal Information of Users in aggregate or anonymized form to build higher quality, more useful online services by performing statistical analysis of the collective characteristics and behavior of our customers and visitors, and by measuring demographics and interests regarding specific areas of the Website. We may provide anonymous statistical information based on this data to suppliers, advertisers, affiliates and other current and potential business partners. We may also use such aggregate data to inform these third parties as to the number of people who have seen and clicked on links to their websites. Any Personal Information which we collect and which we may use in an aggregated format is our property. We may use it, in our sole discretion and without any compensation to you, for any legitimate purpose including without limitation the commercial sale thereof to third parties. Occasionally, WAYBUS will hire a third party for market research, surveys etc. and will provide information to these third parties specifically for use in connection with these projects. The information (including aggregate cookie and tracking information) we provide to such third parties, alliance partners, or vendors are protected by confidentiality agreements and such information is to be used solely for completing the specific project, and in compliance with the applicable regulations.
                    </Text>
                  </View>  

                  <Text style={styles.blackContent}>
                    J. DISCLOSURE OF INFORMATION
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      In addition to the circumstances described above, WAYBUS may disclose User's Personal Information if required to do so:
                    </Text>
                    <View style={styles.leftSpacing}>
                      <Text style={styles.grayContent}>
                        1. By law, required by any enforcement authority for investigation, by court order or in reference to any legal process;
                      </Text>
                      <Text style={styles.grayContent}>
                        2. To Conduct our bussiness.  12
                      </Text>
                      <Text style={styles.grayContent}>
                        3. for regulatory, internal compliance and audit exercise(s)
                      </Text>
                      <Text style={styles.grayContent}>
                        4. to secure our systems; or
                      </Text>
                      <Text style={styles.grayContent}>
                        5. to enforce or protect our rights or properties of WAYBUS or any or all of its affiliates, associates, employees, directors or officers or when we have reason to believe that disclosing Personal Information of User(s) is necessary to identify, contact or bring legal action against someone who may be causing interference with our rights or properties, whether intentionally or otherwise, or when anyone else could be harmed by such activities.
                      </Text>
                    </View>
                    <Text style={styles.grayContent}>
                      Such disclosure and storage may take place without your knowledge. In that case, we shall not be liable to you or any third party for any damages howsoever arising from such disclosure and storage.
                    </Text>
                  </View>

                  <Text style={styles.blackContent}>
                    K. NOTICES AND REVISIONS
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.grayContent}>
                      1. Our business operations and our business are bound to change constantly, and so our Privacy Notice and the Conditions of Use will change also. We may e-mail periodic reminders of our notices and conditions unless you have instructed us not to, but you should check our Website, Mobile site and Mobile Apps frequently to see recent changes.
                    </Text>
                    <Text style={styles.grayContent}>
                      2. Unless stated otherwise, our current Privacy Notice applies to all information that we have about you and your account. By using or continuing to use the Website, Mobile site and Mobile Apps you agree to our use of your information (including sensitive personal information) in accordance with this Privacy Notice, as may be amended from time to time by WAYBUS at its sole discretion. You also agree and consent to us collecting, storing, processing, transferring and sharing information (including sensitive personal information) related to you with third parties or service providers for the purposes as set out in this Privacy Notice.
                    </Text>
                    <Text style={styles.grayContent}>
                      3. If you have any concern about privacy or grievances regarding the Website, Mobile site and Mobile Apps, please email us at support@waybus.com with a detailed description and we will endeavour to resolve the issue for you.
                    </Text>
                  </View> 

                  <Text style={styles.blackContent}>
                    BY VISITING OUR WEBSITE, MOBILE SITE AND MOBILE APPS AND/OR BY USING THE SERVICES OR BY OTHER WISE GIVING US YOUR INFORMATION, YOU WILL BE DEEMED TO HAVE READ,UNDERSTOOD AND AGREED TO THE PRACTICES AND POLICIES OUTLINED IN THIS PRIVACY NOTICE AND AGREE TO BE BOUND BY THE PRIVACY NOTICE. YOU HERE BY CONSENT TO OUR COLLECTION, USE AND SHARING, DISCLOSURE OF YOUR INFORMATION AS DESCRIBED IN THIS PRIVACY NOTICE. WE RESERVE THE RIGHT TO CHANGE, MODIFY, ADD OR DELETE PORTIONS OF THE TERMS OF THIS PRIVACY NOTICE, AT OUR SOLE DISCRETION, AT ANY TIME. IF YOU DO NOT AGREE WITH THIS PRIVACY NOTICE AT ANY TIME, DO NOT USE ANY OFTHE SERVICES OR GIVE US ANY OF YOUR INFORMATION. IF YOU USE THE SERVICES ON BEHALF OF SOME ONE ELSE (SUCH AS YOUR CHILD) OR AN ENTITY (SUCH AS YOUR EMPLOYER) , YOU REPRESENT THAT YOU ARE AUTHORISED BY SUCH INDIVIDUAL OR ENTITY TO
                  </Text>
                  <View style={styles.leftSpacing}>
                    <Text style={styles.blackContent}>
                      1. ACCEPT THIS PRIVACY NOTICE ON SUCH INDIVIDUAL’S OR ENTITY’S BEHALF, AND
                    </Text>
                    <Text style={styles.blackContent}>
                      2. CONSENT ON BEHALF OF SUCH INDIVIDUAL OR ENTITY TO OUR COLLECTION, USE AND DISCLOSURE OF SUCH INDIVIDUAL’S ENTITY’S INFORMATION AS DESCRIBED IN THIS PRIVACY NOTICE.
                    </Text>
                  </View>

                </View>   

              )}
                keyExtractor = {item=> {item}}
            />

          </View>   
        </View>
      </View>
    );
  }
}
