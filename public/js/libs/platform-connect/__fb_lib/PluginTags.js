define( 'PluginTags', function ( require ) {
            var g = {
                activity: {
                    filter: 'string',
                    action: 'string',
                    max_age: 'string',
                    linktarget: 'string',
                    header: 'bool',
                    recommendations: 'bool',
                    site: 'hostname'
                },
                composer: {
                    action_type: 'string',
                    action_properties: 'string'
                },
                create_event_button: {},
                degrees: {
                    href: 'url'
                },
                facepile: {
                    href: 'string',
                    action: 'string',
                    size: 'string',
                    max_rows: 'string',
                    show_count: 'bool'
                },
                follow: {
                    href: 'url',
                    layout: 'string',
                    show_faces: 'bool'
                },
                like_box: {
                    href: 'string',
                    show_faces: 'bool',
                    header: 'bool',
                    stream: 'bool',
                    force_wall: 'bool',
                    show_border: 'bool',
                    id: 'string',
                    connections: 'string',
                    profile_id: 'string',
                    name: 'string'
                },
                open_graph: {
                    href: 'url',
                    layout: 'string',
                    show_faces: 'bool',
                    action_type: 'string',
                    action_properties: 'string'
                },
                open_graph_preview: {
                    action_type: 'string',
                    action_properties: 'string'
                },
                page_events: {
                    href: 'url'
                },
                post: {
                    href: 'url',
                    show_border: 'bool'
                },
                privacy_selector: {},
                profile_pic: {
                    uid: 'string',
                    linked: 'bool',
                    href: 'string',
                    size: 'string',
                    facebook_logo: 'bool'
                },
                recommendations: {
                    filter: 'string',
                    action: 'string',
                    max_age: 'string',
                    linktarget: 'string',
                    header: 'bool',
                    site: 'hostname'
                },
                share_button: {
                    href: 'url',
                    type: 'string'
                },
                shared_activity: {
                    header: 'bool'
                },
                send: {
                    href: 'url'
                },
                send_to_mobile: {
                    max_rows: 'string',
                    show_faces: 'bool',
                    size: 'string'
                },
                story: {
                    href: 'url',
                    show_border: 'bool'
                },
                topic: {
                    topic_name: 'string',
                    topic_id: 'string'
                },
                want: {
                    href: 'url',
                    layout: 'string',
                    show_faces: 'bool'
                }
            }, h = {
                    subscribe: 'follow',
                    fan: 'like_box',
                    likebox: 'like_box',
                    friendpile: 'facepile'
                };
            ES5(ES5('Object', 'keys', false, h), 'forEach', true, function (i) {
                g[i] = g[h[i]];
            });
            module.exports = g;
        });