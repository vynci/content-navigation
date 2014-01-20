define( 'SDKConfig', [], {
            "bustCache": true,
            "tagCountLogRate": 0.01,
            "errorHandling": {
                "rate": 4
            },
            "usePluginPipe": true,
            "features": {
                "xfbml_profile_pic_server": true,
                "error_handling": {
                    "rate": 4
                },
                "e2e_ping_tracking": {
                    "rate": 1.0e-6
                }
            },
            "api": {
                "mode": "warn",
                "whitelist": ["Canvas", "Canvas.Prefetcher", "Canvas.Prefetcher.addStaticResource", "Canvas.Prefetcher.setCollectionMode", "Canvas.getPageInfo", "Canvas.hideFlashElement", "Canvas.scrollTo", "Canvas.setAutoGrow", "Canvas.setDoneLoading", "Canvas.setSize", "Canvas.setUrlHandler", "Canvas.showFlashElement", "Canvas.startTimer", "Canvas.stopTimer", "Data", "Data.process", "Data.query", "Data.query:wait", "Data.waitOn", "Data.waitOn:wait", "Event", "Event.subscribe", "Event.unsubscribe", "Music.flashCallback", "Music.init", "Music.send", "Payment", "Payment.cancelFlow", "Payment.continueFlow", "Payment.init", "Payment.lockForProcessing", "Payment.unlockForProcessing", "Payment.parse", "Payment.setSize", "ThirdPartyProvider", "ThirdPartyProvider.init", "ThirdPartyProvider.sendData", "UA", "UA.nativeApp", "XFBML", "XFBML.RecommendationsBar", "XFBML.RecommendationsBar.markRead", "XFBML.parse", "addFriend", "api", "getAccessToken", "getAuthResponse", "getLoginStatus", "getUserID", "init", "login", "logout", "publish", "share", "ui", "ui:subscribe"]
            },
            "initSitevars": {
                "enableMobileComments": 1,
                "iframePermissions": {
                    "read_stream"         : false,
                    "manage_mailbox"      : false,
                    "manage_friendlists"  : false,
                    "read_mailbox"        : false,
                    "publish_checkins"    : true,
                    "status_update"       : true,
                    "photo_upload"        : true,
                    "video_upload"        : true,
                    "sms"                 : false,
                    "create_event"        : true,
                    "rsvp_event"          : true,
                    "offline_access"      : true,
                    "email"               : true,
                    "xmpp_login"          : false,
                    "create_note"         : true,
                    "share_item"          : true,
                    "export_stream"       : false,
                    "publish_stream"      : true,
                    "publish_likes"       : true,
                    "ads_management"      : false,
                    "contact_email"       : true,
                    "access_private_data" : false,
                    "read_insights"       : false,
                    "read_requests"       : false,
                    "read_friendlists"    : true,
                    "manage_pages"        : false,
                    "physical_login"      : false,
                    "manage_groups"       : false,
                    "read_deals"          : false
                }
            }
        });