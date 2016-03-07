(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
require.register("js/iconPicker/app", function(exports, require, module) {
'use strict';

var materialIcons = require('js/iconPicker/materialIcons');

var App = {

    init: function init() {

        var iconsContainer = $('#container-icons');
        var categoryTemplate = $('#template-category');
        var hrTemplate = $('#template-hr');
        var iconTemplate = $('#template-icon');

        for (var i = 0; i < materialIcons.length; ++i) {
            // add hr
            if (i != 0) {
                var hr = hrTemplate.clone();
                hr.removeAttr('id');
                iconsContainer.append(hr);
            }

            var category = materialIcons[i];

            // create + append category
            var categoryDiv = categoryTemplate.clone();
            categoryDiv.removeAttr('id');
            iconsContainer.append(categoryDiv);

            // set category data
            var categoryName = category.category;
            var fileNames = category.fileNames;
            categoryDiv.find('h2').html(categoryName);

            for (var j = 0; j < fileNames.length; ++j) {
                var fileName = fileNames[j];

                // create + append icon
                var iconDiv = iconTemplate.clone();
                iconDiv.removeAttr('id');
                categoryDiv.append(iconDiv);

                // set icon
                var img = iconDiv.find('img');
                img.attr('src', '../material-icons/' + categoryName + '/' + fileName);

                // set icon name fileName
                var iconName = fileName.replace('ic_', '').replace('_48px.svg', '').replace(new RegExp('_', 'g'), ' ');
                iconDiv.find('.icon-title').html(iconName);

                // set link
                iconDiv.find('.container-icon-anchor').attr('href', '../?icon=' + 'material-icons/' + categoryName + '/' + fileName);
            }
        }
    }

};

module.exports = App;
});

require.register("js/iconPicker/materialIcons", function(exports, require, module) {
'use strict';

module.exports = [{
	category: 'action',
	fileNames: ['ic_3d_rotation_48px.svg', 'ic_accessibility_48px.svg', 'ic_accessible_48px.svg', 'ic_account_balance_48px.svg', 'ic_account_balance_wallet_48px.svg', 'ic_account_box_48px.svg', 'ic_account_circle_48px.svg', 'ic_add_shopping_cart_48px.svg', 'ic_alarm_48px.svg', 'ic_alarm_add_48px.svg', 'ic_alarm_off_48px.svg', 'ic_alarm_on_48px.svg', 'ic_all_out_48px.svg', 'ic_android_48px.svg', 'ic_announcement_48px.svg', 'ic_aspect_ratio_48px.svg', 'ic_assessment_48px.svg', 'ic_assignment_48px.svg', 'ic_assignment_ind_48px.svg', 'ic_assignment_late_48px.svg', 'ic_assignment_return_48px.svg', 'ic_assignment_returned_48px.svg', 'ic_assignment_turned_in_48px.svg', 'ic_autorenew_48px.svg', 'ic_backup_48px.svg', 'ic_book_48px.svg', 'ic_bookmark_48px.svg', 'ic_bookmark_border_48px.svg', 'ic_bug_report_48px.svg', 'ic_build_48px.svg', 'ic_cached_48px.svg', 'ic_card_giftcard_48px.svg', 'ic_card_membership_48px.svg', 'ic_card_travel_48px.svg', 'ic_change_history_48px.svg', 'ic_check_circle_48px.svg', 'ic_chrome_reader_mode_48px.svg', 'ic_class_48px.svg', 'ic_code_48px.svg', 'ic_compare_arrows_48px.svg', 'ic_copyright_48px.svg', 'ic_credit_card_48px.svg', 'ic_dashboard_48px.svg', 'ic_date_range_48px.svg', 'ic_delete_48px.svg', 'ic_description_48px.svg', 'ic_dns_48px.svg', 'ic_done_48px.svg', 'ic_done_all_48px.svg', 'ic_donut_large_48px.svg', 'ic_donut_small_48px.svg', 'ic_event_48px.svg', 'ic_event_seat_48px.svg', 'ic_exit_to_app_48px.svg', 'ic_explore_48px.svg', 'ic_extension_48px.svg', 'ic_face_48px.svg', 'ic_favorite_48px.svg', 'ic_favorite_border_48px.svg', 'ic_feedback_48px.svg', 'ic_find_in_page_48px.svg', 'ic_find_replace_48px.svg', 'ic_fingerprint_48px.svg', 'ic_flight_land_48px.svg', 'ic_flight_takeoff_48px.svg', 'ic_flip_to_back_48px.svg', 'ic_flip_to_front_48px.svg', 'ic_gavel_48px.svg', 'ic_get_app_48px.svg', 'ic_grade_48px.svg', 'ic_group_work_48px.svg', 'ic_help_48px.svg', 'ic_highlight_off_48px.svg', 'ic_history_48px.svg', 'ic_home_48px.svg', 'ic_hourglass_empty_48px.svg', 'ic_hourglass_full_48px.svg', 'ic_http_48px.svg', 'ic_https_48px.svg', 'ic_important_devices_48px.svg', 'ic_info_48px.svg', 'ic_info_outline_48px.svg', 'ic_input_48px.svg', 'ic_invert_colors_48px.svg', 'ic_label_48px.svg', 'ic_label_outline_48px.svg', 'ic_language_48px.svg', 'ic_launch_48px.svg', 'ic_lightbulb_outline_48px.svg', 'ic_line_style_48px.svg', 'ic_line_weight_48px.svg', 'ic_list_48px.svg', 'ic_lock_48px.svg', 'ic_lock_open_48px.svg', 'ic_lock_outline_48px.svg', 'ic_loyalty_48px.svg', 'ic_markunread_mailbox_48px.svg', 'ic_motorcycle_48px.svg', 'ic_note_add_48px.svg', 'ic_opacity_48px.svg', 'ic_open_in_browser_48px.svg', 'ic_open_in_new_48px.svg', 'ic_open_with_48px.svg', 'ic_pageview_48px.svg', 'ic_pan_tool_48px.svg', 'ic_payment_48px.svg', 'ic_perm_camera_mic_48px.svg', 'ic_perm_contact_calendar_48px.svg', 'ic_perm_data_setting_48px.svg', 'ic_perm_device_information_48px.svg', 'ic_perm_identity_48px.svg', 'ic_perm_media_48px.svg', 'ic_perm_phone_msg_48px.svg', 'ic_perm_scan_wifi_48px.svg', 'ic_pets_48px.svg', 'ic_picture_in_picture_48px.svg', 'ic_picture_in_picture_alt_48px.svg', 'ic_play_for_work_48px.svg', 'ic_polymer_48px.svg', 'ic_power_settings_new_48px.svg', 'ic_pregnant_woman_48px.svg', 'ic_print_48px.svg', 'ic_query_builder_48px.svg', 'ic_question_answer_48px.svg', 'ic_receipt_48px.svg', 'ic_record_voice_over_48px.svg', 'ic_redeem_48px.svg', 'ic_report_problem_48px.svg', 'ic_restore_48px.svg', 'ic_room_48px.svg', 'ic_rounded_corner_48px.svg', 'ic_rowing_48px.svg', 'ic_schedule_48px.svg', 'ic_search_48px.svg', 'ic_settings_48px.svg', 'ic_settings_applications_48px.svg', 'ic_settings_backup_restore_48px.svg', 'ic_settings_bluetooth_48px.svg', 'ic_settings_brightness_48px.svg', 'ic_settings_cell_48px.svg', 'ic_settings_ethernet_48px.svg', 'ic_settings_input_antenna_48px.svg', 'ic_settings_input_component_48px.svg', 'ic_settings_input_composite_48px.svg', 'ic_settings_input_hdmi_48px.svg', 'ic_settings_input_svideo_48px.svg', 'ic_settings_overscan_48px.svg', 'ic_settings_phone_48px.svg', 'ic_settings_power_48px.svg', 'ic_settings_remote_48px.svg', 'ic_settings_voice_48px.svg', 'ic_shop_48px.svg', 'ic_shopping_basket_48px.svg', 'ic_shopping_cart_48px.svg', 'ic_shop_two_48px.svg', 'ic_speaker_notes_48px.svg', 'ic_spellcheck_48px.svg', 'ic_stars_48px.svg', 'ic_store_48px.svg', 'ic_subject_48px.svg', 'ic_supervisor_account_48px.svg', 'ic_swap_horiz_48px.svg', 'ic_swap_vert_48px.svg', 'ic_swap_vertical_circle_48px.svg', 'ic_system_update_alt_48px.svg', 'ic_tab_48px.svg', 'ic_tab_unselected_48px.svg', 'ic_theaters_48px.svg', 'ic_thumb_down_48px.svg', 'ic_thumbs_up_down_48px.svg', 'ic_thumb_up_48px.svg', 'ic_timeline_48px.svg', 'ic_toc_48px.svg', 'ic_today_48px.svg', 'ic_toll_48px.svg', 'ic_touch_app_48px.svg', 'ic_track_changes_48px.svg', 'ic_translate_48px.svg', 'ic_trending_down_48px.svg', 'ic_trending_flat_48px.svg', 'ic_trending_up_48px.svg', 'ic_turned_in_48px.svg', 'ic_turned_in_not_48px.svg', 'ic_update_48px.svg', 'ic_verified_user_48px.svg', 'ic_view_agenda_48px.svg', 'ic_view_array_48px.svg', 'ic_view_carousel_48px.svg', 'ic_view_column_48px.svg', 'ic_view_day_48px.svg', 'ic_view_headline_48px.svg', 'ic_view_list_48px.svg', 'ic_view_module_48px.svg', 'ic_view_quilt_48px.svg', 'ic_view_stream_48px.svg', 'ic_view_week_48px.svg', 'ic_visibility_48px.svg', 'ic_visibility_off_48px.svg', 'ic_watch_later_48px.svg', 'ic_work_48px.svg', 'ic_youtube_searched_for_48px.svg']
}, {
	category: 'alert',
	fileNames: ['ic_add_alert_48px.svg', 'ic_error_48px.svg', 'ic_error_outline_48px.svg', 'ic_warning_48px.svg']
}, {
	category: 'av',
	fileNames: ['ic_add_to_queue_48px.svg', 'ic_airplay_48px.svg', 'ic_album_48px.svg', 'ic_art_track_48px.svg', 'ic_av_timer_48px.svg', 'ic_closed_caption_48px.svg', 'ic_equalizer_48px.svg', 'ic_explicit_48px.svg', 'ic_fast_forward_48px.svg', 'ic_fast_rewind_48px.svg', 'ic_fiber_dvr_48px.svg', 'ic_fiber_manual_record_48px.svg', 'ic_fiber_new_48px.svg', 'ic_fiber_pin_48px.svg', 'ic_fiber_smart_record_48px.svg', 'ic_forward_10_48px.svg', 'ic_forward_30_48px.svg', 'ic_forward_5_48px.svg', 'ic_games_48px.svg', 'ic_hearing_48px.svg', 'ic_high_quality_48px.svg', 'ic_library_add_48px.svg', 'ic_library_books_48px.svg', 'ic_library_music_48px.svg', 'ic_loop_48px.svg', 'ic_mic_48px.svg', 'ic_mic_none_48px.svg', 'ic_mic_off_48px.svg', 'ic_movie_48px.svg', 'ic_music_video_48px.svg', 'ic_new_releases_48px.svg', 'ic_not_interested_48px.svg', 'ic_pause_48px.svg', 'ic_pause_circle_filled_48px.svg', 'ic_pause_circle_outline_48px.svg', 'ic_play_arrow_48px.svg', 'ic_play_circle_filled_48px.svg', 'ic_play_circle_outline_48px.svg', 'ic_playlist_add_48px.svg', 'ic_playlist_add_check_48px.svg', 'ic_playlist_play_48px.svg', 'ic_queue_48px.svg', 'ic_queue_music_48px.svg', 'ic_queue_play_next_48px.svg', 'ic_radio_48px.svg', 'ic_recent_actors_48px.svg', 'ic_remove_from_queue_48px.svg', 'ic_repeat_48px.svg', 'ic_repeat_one_48px.svg', 'ic_replay_10_48px.svg', 'ic_replay_30_48px.svg', 'ic_replay_48px.svg', 'ic_replay_5_48px.svg', 'ic_shuffle_48px.svg', 'ic_skip_next_48px.svg', 'ic_skip_previous_48px.svg', 'ic_slow_motion_video_48px.svg', 'ic_snooze_48px.svg', 'ic_stop_48px.svg', 'ic_subscriptions_48px.svg', 'ic_subtitles_48px.svg', 'ic_surround_sound_48px.svg', 'ic_videocam_48px.svg', 'ic_videocam_off_48px.svg', 'ic_video_library_48px.svg', 'ic_volume_down_48px.svg', 'ic_volume_mute_48px.svg', 'ic_volume_off_48px.svg', 'ic_volume_up_48px.svg', 'ic_web_48px.svg', 'ic_web_asset_48px.svg']
}, {
	category: 'communication',
	fileNames: ['ic_business_48px.svg', 'ic_call_48px.svg', 'ic_call_end_48px.svg', 'ic_call_made_48px.svg', 'ic_call_merge_48px.svg', 'ic_call_missed_48px.svg', 'ic_call_missed_outgoing_48px.svg', 'ic_call_received_48px.svg', 'ic_call_split_48px.svg', 'ic_chat_48px.svg', 'ic_chat_bubble_48px.svg', 'ic_chat_bubble_outline_48px.svg', 'ic_clear_all_48px.svg', 'ic_comment_48px.svg', 'ic_contact_mail_48px.svg', 'ic_contact_phone_48px.svg', 'ic_contacts_48px.svg', 'ic_dialer_sip_48px.svg', 'ic_dialpad_48px.svg', 'ic_email_48px.svg', 'ic_forum_48px.svg', 'ic_import_contacts_48px.svg', 'ic_import_export_48px.svg', 'ic_invert_colors_off_48px.svg', 'ic_live_help_48px.svg', 'ic_location_off_48px.svg', 'ic_location_on_48px.svg', 'ic_mail_outline_48px.svg', 'ic_message_48px.svg', 'ic_no_sim_48px.svg', 'ic_phone_48px.svg', 'ic_portable_wifi_off_48px.svg', 'ic_present_to_all_48px.svg', 'ic_ring_volume_48px.svg', 'ic_screen_share_48px.svg', 'ic_speaker_phone_48px.svg', 'ic_stay_current_landscape_48px.svg', 'ic_stay_current_portrait_48px.svg', 'ic_stay_primary_landscape_48px.svg', 'ic_stay_primary_portrait_48px.svg', 'ic_stop_screen_share_48px.svg', 'ic_swap_calls_48px.svg', 'ic_textsms_48px.svg', 'ic_voicemail_48px.svg', 'ic_vpn_key_48px.svg']
}, {
	category: 'content',
	fileNames: ['ic_add_48px.svg', 'ic_add_box_48px.svg', 'ic_add_circle_48px.svg', 'ic_add_circle_outline_48px.svg', 'ic_archive_48px.svg', 'ic_backspace_48px.svg', 'ic_block_48px.svg', 'ic_clear_48px.svg', 'ic_content_copy_48px.svg', 'ic_content_cut_48px.svg', 'ic_content_paste_48px.svg', 'ic_create_48px.svg', 'ic_drafts_48px.svg', 'ic_filter_list_48px.svg', 'ic_flag_48px.svg', 'ic_forward_48px.svg', 'ic_gesture_48px.svg', 'ic_inbox_48px.svg', 'ic_link_48px.svg', 'ic_mail_48px.svg', 'ic_markunread_48px.svg', 'ic_move_to_inbox_48px.svg', 'ic_next_week_48px.svg', 'ic_redo_48px.svg', 'ic_remove_48px.svg', 'ic_remove_circle_48px.svg', 'ic_remove_circle_outline_48px.svg', 'ic_reply_48px.svg', 'ic_reply_all_48px.svg', 'ic_report_48px.svg', 'ic_save_48px.svg', 'ic_select_all_48px.svg', 'ic_send_48px.svg', 'ic_sort_48px.svg', 'ic_text_format_48px.svg', 'ic_unarchive_48px.svg', 'ic_undo_48px.svg', 'ic_weekend_48px.svg']
}, {
	category: 'device',
	fileNames: ['ic_access_alarm_48px.svg', 'ic_access_alarms_48px.svg', 'ic_access_time_48px.svg', 'ic_add_alarm_48px.svg', 'ic_airplanemode_active_48px.svg', 'ic_airplanemode_inactive_48px.svg', 'ic_battery_20_48px.svg', 'ic_battery_30_48px.svg', 'ic_battery_50_48px.svg', 'ic_battery_60_48px.svg', 'ic_battery_80_48px.svg', 'ic_battery_90_48px.svg', 'ic_battery_alert_48px.svg', 'ic_battery_charging_20_48px.svg', 'ic_battery_charging_30_48px.svg', 'ic_battery_charging_50_48px.svg', 'ic_battery_charging_60_48px.svg', 'ic_battery_charging_80_48px.svg', 'ic_battery_charging_90_48px.svg', 'ic_battery_charging_full_48px.svg', 'ic_battery_full_48px.svg', 'ic_battery_std_48px.svg', 'ic_battery_unknown_48px.svg', 'ic_bluetooth_48px.svg', 'ic_bluetooth_connected_48px.svg', 'ic_bluetooth_disabled_48px.svg', 'ic_bluetooth_searching_48px.svg', 'ic_brightness_auto_48px.svg', 'ic_brightness_high_48px.svg', 'ic_brightness_low_48px.svg', 'ic_brightness_medium_48px.svg', 'ic_data_usage_48px.svg', 'ic_developer_mode_48px.svg', 'ic_devices_48px.svg', 'ic_dvr_48px.svg', 'ic_gps_fixed_48px.svg', 'ic_gps_not_fixed_48px.svg', 'ic_gps_off_48px.svg', 'ic_graphic_eq_48px.svg', 'ic_location_disabled_48px.svg', 'ic_location_searching_48px.svg', 'ic_network_cell_48px.svg', 'ic_network_wifi_48px.svg', 'ic_nfc_48px.svg', 'ic_screen_lock_landscape_48px.svg', 'ic_screen_lock_portrait_48px.svg', 'ic_screen_lock_rotation_48px.svg', 'ic_screen_rotation_48px.svg', 'ic_sd_storage_48px.svg', 'ic_settings_system_daydream_48px.svg', 'ic_signal_cellular_0_bar_48px.svg', 'ic_signal_cellular_1_bar_48px.svg', 'ic_signal_cellular_2_bar_48px.svg', 'ic_signal_cellular_3_bar_48px.svg', 'ic_signal_cellular_4_bar_48px.svg', 'ic_signal_cellular_connected_no_internet_0_bar_48px.svg', 'ic_signal_cellular_connected_no_internet_1_bar_48px.svg', 'ic_signal_cellular_connected_no_internet_2_bar_48px.svg', 'ic_signal_cellular_connected_no_internet_3_bar_48px.svg', 'ic_signal_cellular_connected_no_internet_4_bar_48px.svg', 'ic_signal_cellular_no_sim_48px.svg', 'ic_signal_cellular_null_48px.svg', 'ic_signal_cellular_off_48px.svg', 'ic_signal_wifi_0_bar_48px.svg', 'ic_signal_wifi_1_bar_48px.svg', 'ic_signal_wifi_1_bar_lock_48px.svg', 'ic_signal_wifi_2_bar_48px.svg', 'ic_signal_wifi_2_bar_lock_48px.svg', 'ic_signal_wifi_3_bar_48px.svg', 'ic_signal_wifi_3_bar_lock_48px.svg', 'ic_signal_wifi_4_bar_48px.svg', 'ic_signal_wifi_4_bar_lock_48px.svg', 'ic_signal_wifi_off_48px.svg', 'ic_storage_48px.svg', 'ic_usb_48px.svg', 'ic_wallpaper_48px.svg', 'ic_widgets_48px.svg', 'ic_wifi_lock_48px.svg', 'ic_wifi_tethering_48px.svg']
}, {
	category: 'editor',
	fileNames: ['ic_attach_file_48px.svg', 'ic_attach_money_48px.svg', 'ic_border_all_48px.svg', 'ic_border_bottom_48px.svg', 'ic_border_clear_48px.svg', 'ic_border_color_48px.svg', 'ic_border_horizontal_48px.svg', 'ic_border_inner_48px.svg', 'ic_border_left_48px.svg', 'ic_border_outer_48px.svg', 'ic_border_right_48px.svg', 'ic_border_style_48px.svg', 'ic_border_top_48px.svg', 'ic_border_vertical_48px.svg', 'ic_drag_handle_48px.svg', 'ic_format_align_center_48px.svg', 'ic_format_align_justify_48px.svg', 'ic_format_align_left_48px.svg', 'ic_format_align_right_48px.svg', 'ic_format_bold_48px.svg', 'ic_format_clear_48px.svg', 'ic_format_color_fill_48px.svg', 'ic_format_color_reset_48px.svg', 'ic_format_color_text_48px.svg', 'ic_format_indent_decrease_48px.svg', 'ic_format_indent_increase_48px.svg', 'ic_format_italic_48px.svg', 'ic_format_line_spacing_48px.svg', 'ic_format_list_bulleted_48px.svg', 'ic_format_list_numbered_48px.svg', 'ic_format_paint_48px.svg', 'ic_format_quote_48px.svg', 'ic_format_shapes_48px.svg', 'ic_format_size_48px.svg', 'ic_format_strikethrough_48px.svg', 'ic_format_textdirection_l_to_r_48px.svg', 'ic_format_textdirection_r_to_l_48px.svg', 'ic_format_underlined_48px.svg', 'ic_functions_48px.svg', 'ic_highlight_48px.svg', 'ic_insert_chart_48px.svg', 'ic_insert_comment_48px.svg', 'ic_insert_drive_file_48px.svg', 'ic_insert_emoticon_48px.svg', 'ic_insert_invitation_48px.svg', 'ic_insert_link_48px.svg', 'ic_insert_photo_48px.svg', 'ic_linear_scale_48px.svg', 'ic_merge_type_48px.svg', 'ic_mode_comment_48px.svg', 'ic_mode_edit_48px.svg', 'ic_publish_48px.svg', 'ic_short_text_48px.svg', 'ic_space_bar_48px.svg', 'ic_strikethrough_s_48px.svg', 'ic_text_fields_48px.svg', 'ic_vertical_align_bottom_48px.svg', 'ic_vertical_align_center_48px.svg', 'ic_vertical_align_top_48px.svg', 'ic_wrap_text_48px.svg']
}, {
	category: 'file',
	fileNames: ['ic_attachment_48px.svg', 'ic_cloud_48px.svg', 'ic_cloud_circle_48px.svg', 'ic_cloud_done_48px.svg', 'ic_cloud_download_48px.svg', 'ic_cloud_off_48px.svg', 'ic_cloud_queue_48px.svg', 'ic_cloud_upload_48px.svg', 'ic_create_new_folder_48px.svg', 'ic_file_download_48px.svg', 'ic_file_upload_48px.svg', 'ic_folder_48px.svg', 'ic_folder_open_48px.svg', 'ic_folder_shared_48px.svg']
}, {
	category: 'hardware',
	fileNames: ['ic_cast_48px.svg', 'ic_cast_connected_48px.svg', 'ic_computer_48px.svg', 'ic_desktop_mac_48px.svg', 'ic_desktop_windows_48px.svg', 'ic_developer_board_48px.svg', 'ic_devices_other_48px.svg', 'ic_dock_48px.svg', 'ic_gamepad_48px.svg', 'ic_headset_48px.svg', 'ic_headset_mic_48px.svg', 'ic_keyboard_48px.svg', 'ic_keyboard_arrow_down_48px.svg', 'ic_keyboard_arrow_left_48px.svg', 'ic_keyboard_arrow_right_48px.svg', 'ic_keyboard_arrow_up_48px.svg', 'ic_keyboard_backspace_48px.svg', 'ic_keyboard_capslock_48px.svg', 'ic_keyboard_hide_48px.svg', 'ic_keyboard_return_48px.svg', 'ic_keyboard_tab_48px.svg', 'ic_keyboard_voice_48px.svg', 'ic_laptop_48px.svg', 'ic_laptop_chromebook_48px.svg', 'ic_laptop_mac_48px.svg', 'ic_laptop_windows_48px.svg', 'ic_memory_48px.svg', 'ic_mouse_48px.svg', 'ic_phone_android_48px.svg', 'ic_phone_iphone_48px.svg', 'ic_phonelink_48px.svg', 'ic_phonelink_off_48px.svg', 'ic_power_input_48px.svg', 'ic_router_48px.svg', 'ic_scanner_48px.svg', 'ic_security_48px.svg', 'ic_sim_card_48px.svg', 'ic_smartphone_48px.svg', 'ic_speaker_48px.svg', 'ic_speaker_group_48px.svg', 'ic_tablet_48px.svg', 'ic_tablet_android_48px.svg', 'ic_tablet_mac_48px.svg', 'ic_toys_48px.svg', 'ic_tv_48px.svg', 'ic_videogame_asset_48px.svg', 'ic_watch_48px.svg']
}, {
	category: 'image',
	fileNames: ['ic_add_a_photo_48px.svg', 'ic_add_to_photos_48px.svg', 'ic_adjust_48px.svg', 'ic_assistant_48px.svg', 'ic_assistant_photo_48px.svg', 'ic_audiotrack_48px.svg', 'ic_blur_circular_48px.svg', 'ic_blur_linear_48px.svg', 'ic_blur_off_48px.svg', 'ic_blur_on_48px.svg', 'ic_brightness_1_48px.svg', 'ic_brightness_2_48px.svg', 'ic_brightness_3_48px.svg', 'ic_brightness_4_48px.svg', 'ic_brightness_5_48px.svg', 'ic_brightness_6_48px.svg', 'ic_brightness_7_48px.svg', 'ic_broken_image_48px.svg', 'ic_brush_48px.svg', 'ic_camera_48px.svg', 'ic_camera_alt_48px.svg', 'ic_camera_front_48px.svg', 'ic_camera_rear_48px.svg', 'ic_camera_roll_48px.svg', 'ic_center_focus_strong_48px.svg', 'ic_center_focus_weak_48px.svg', 'ic_collections_48px.svg', 'ic_colorize_48px.svg', 'ic_color_lens_48px.svg', 'ic_compare_48px.svg', 'ic_control_point_48px.svg', 'ic_control_point_duplicate_48px.svg', 'ic_crop_16_9_48px.svg', 'ic_crop_3_2_48px.svg', 'ic_crop_48px.svg', 'ic_crop_5_4_48px.svg', 'ic_crop_7_5_48px.svg', 'ic_crop_din_48px.svg', 'ic_crop_free_48px.svg', 'ic_crop_landscape_48px.svg', 'ic_crop_original_48px.svg', 'ic_crop_portrait_48px.svg', 'ic_crop_rotate_48px.svg', 'ic_crop_square_48px.svg', 'ic_dehaze_48px.svg', 'ic_details_48px.svg', 'ic_edit_48px.svg', 'ic_exposure_48px.svg', 'ic_exposure_neg_1_48px.svg', 'ic_exposure_neg_2_48px.svg', 'ic_exposure_plus_1_48px.svg', 'ic_exposure_plus_2_48px.svg', 'ic_exposure_zero_48px.svg', 'ic_filter_1_48px.svg', 'ic_filter_2_48px.svg', 'ic_filter_3_48px.svg', 'ic_filter_4_48px.svg', 'ic_filter_48px.svg', 'ic_filter_5_48px.svg', 'ic_filter_6_48px.svg', 'ic_filter_7_48px.svg', 'ic_filter_8_48px.svg', 'ic_filter_9_48px.svg', 'ic_filter_9_plus_48px.svg', 'ic_filter_b_and_w_48px.svg', 'ic_filter_center_focus_48px.svg', 'ic_filter_drama_48px.svg', 'ic_filter_frames_48px.svg', 'ic_filter_hdr_48px.svg', 'ic_filter_none_48px.svg', 'ic_filter_tilt_shift_48px.svg', 'ic_filter_vintage_48px.svg', 'ic_flare_48px.svg', 'ic_flash_auto_48px.svg', 'ic_flash_off_48px.svg', 'ic_flash_on_48px.svg', 'ic_flip_48px.svg', 'ic_gradient_48px.svg', 'ic_grain_48px.svg', 'ic_grid_off_48px.svg', 'ic_grid_on_48px.svg', 'ic_hdr_off_48px.svg', 'ic_hdr_on_48px.svg', 'ic_hdr_strong_48px.svg', 'ic_hdr_weak_48px.svg', 'ic_healing_48px.svg', 'ic_image_48px.svg', 'ic_image_aspect_ratio_48px.svg', 'ic_iso_48px.svg', 'ic_landscape_48px.svg', 'ic_leak_add_48px.svg', 'ic_leak_remove_48px.svg', 'ic_lens_48px.svg', 'ic_linked_camera_48px.svg', 'ic_looks_3_48px.svg', 'ic_looks_4_48px.svg', 'ic_looks_48px.svg', 'ic_looks_5_48px.svg', 'ic_looks_6_48px.svg', 'ic_looks_one_48px.svg', 'ic_looks_two_48px.svg', 'ic_loupe_48px.svg', 'ic_monochrome_photos_48px.svg', 'ic_movie_creation_48px.svg', 'ic_movie_filter_48px.svg', 'ic_music_note_48px.svg', 'ic_nature_48px.svg', 'ic_nature_people_48px.svg', 'ic_navigate_before_48px.svg', 'ic_navigate_next_48px.svg', 'ic_palette_48px.svg', 'ic_panorama_48px.svg', 'ic_panorama_fish_eye_48px.svg', 'ic_panorama_horizontal_48px.svg', 'ic_panorama_vertical_48px.svg', 'ic_panorama_wide_angle_48px.svg', 'ic_photo_48px.svg', 'ic_photo_album_48px.svg', 'ic_photo_camera_48px.svg', 'ic_photo_filter_48px.svg', 'ic_photo_library_48px.svg', 'ic_picture_as_pdf_48px.svg', 'ic_portrait_48px.svg', 'ic_remove_red_eye_48px.svg', 'ic_rotate_90_degrees_ccw_48px.svg', 'ic_rotate_left_48px.svg', 'ic_rotate_right_48px.svg', 'ic_slideshow_48px.svg', 'ic_straighten_48px.svg', 'ic_style_48px.svg', 'ic_switch_camera_48px.svg', 'ic_switch_video_48px.svg', 'ic_tag_faces_48px.svg', 'ic_texture_48px.svg', 'ic_timelapse_48px.svg', 'ic_timer_10_48px.svg', 'ic_timer_3_48px.svg', 'ic_timer_48px.svg', 'ic_timer_off_48px.svg', 'ic_tonality_48px.svg', 'ic_transform_48px.svg', 'ic_tune_48px.svg', 'ic_view_comfy_48px.svg', 'ic_view_compact_48px.svg', 'ic_wb_auto_48px.svg', 'ic_wb_cloudy_48px.svg', 'ic_wb_incandescent_48px.svg', 'ic_wb_iridescent_48px.svg', 'ic_wb_sunny_48px.svg']
}, {
	category: 'maps',
	fileNames: ['ic_add_location_48px.svg', 'ic_beenhere_48px.svg', 'ic_directions_48px.svg', 'ic_directions_bike_48px.svg', 'ic_directions_boat_48px.svg', 'ic_directions_bus_48px.svg', 'ic_directions_car_48px.svg', 'ic_directions_railway_48px.svg', 'ic_directions_run_48px.svg', 'ic_directions_subway_48px.svg', 'ic_directions_transit_48px.svg', 'ic_directions_walk_48px.svg', 'ic_edit_location_48px.svg', 'ic_flight_48px.svg', 'ic_hotel_48px.svg', 'ic_layers_48px.svg', 'ic_layers_clear_48px.svg', 'ic_local_activity_48px.svg', 'ic_local_airport_48px.svg', 'ic_local_atm_48px.svg', 'ic_local_bar_48px.svg', 'ic_local_cafe_48px.svg', 'ic_local_car_wash_48px.svg', 'ic_local_convenience_store_48px.svg', 'ic_local_dining_48px.svg', 'ic_local_drink_48px.svg', 'ic_local_florist_48px.svg', 'ic_local_gas_station_48px.svg', 'ic_local_grocery_store_48px.svg', 'ic_local_hospital_48px.svg', 'ic_local_hotel_48px.svg', 'ic_local_laundry_service_48px.svg', 'ic_local_library_48px.svg', 'ic_local_mall_48px.svg', 'ic_local_movies_48px.svg', 'ic_local_offer_48px.svg', 'ic_local_parking_48px.svg', 'ic_local_pharmacy_48px.svg', 'ic_local_phone_48px.svg', 'ic_local_pizza_48px.svg', 'ic_local_play_48px.svg', 'ic_local_post_office_48px.svg', 'ic_local_printshop_48px.svg', 'ic_local_see_48px.svg', 'ic_local_shipping_48px.svg', 'ic_local_taxi_48px.svg', 'ic_map_48px.svg', 'ic_my_location_48px.svg', 'ic_navigation_48px.svg', 'ic_near_me_48px.svg', 'ic_person_pin_48px.svg', 'ic_person_pin_circle_48px.svg', 'ic_pin_drop_48px.svg', 'ic_place_48px.svg', 'ic_rate_review_48px.svg', 'ic_restaurant_menu_48px.svg', 'ic_satellite_48px.svg', 'ic_store_mall_directory_48px.svg', 'ic_terrain_48px.svg', 'ic_traffic_48px.svg', 'ic_zoom_out_map_48px.svg']
}, {
	category: 'navigation',
	fileNames: ['ic_apps_48px.svg', 'ic_arrow_back_48px.svg', 'ic_arrow_downward_48px.svg', 'ic_arrow_drop_down_48px.svg', 'ic_arrow_drop_down_circle_48px.svg', 'ic_arrow_drop_up_48px.svg', 'ic_arrow_forward_48px.svg', 'ic_arrow_upward_48px.svg', 'ic_cancel_48px.svg', 'ic_check_48px.svg', 'ic_chevron_left_48px.svg', 'ic_chevron_right_48px.svg', 'ic_close_48px.svg', 'ic_expand_less_48px.svg', 'ic_expand_more_48px.svg', 'ic_fullscreen_48px.svg', 'ic_fullscreen_exit_48px.svg', 'ic_menu_48px.svg', 'ic_more_horiz_48px.svg', 'ic_more_vert_48px.svg', 'ic_refresh_48px.svg', 'ic_subdirectory_arrow_left_48px.svg', 'ic_subdirectory_arrow_right_48px.svg', 'ic_unfold_less_48px.svg', 'ic_unfold_more_48px.svg']
}, {
	category: 'notification',
	fileNames: ['ic_adb_48px.svg', 'ic_airline_seat_flat_48px.svg', 'ic_airline_seat_flat_angled_48px.svg', 'ic_airline_seat_individual_suite_48px.svg', 'ic_airline_seat_legroom_extra_48px.svg', 'ic_airline_seat_legroom_normal_48px.svg', 'ic_airline_seat_legroom_reduced_48px.svg', 'ic_airline_seat_recline_extra_48px.svg', 'ic_airline_seat_recline_normal_48px.svg', 'ic_bluetooth_audio_48px.svg', 'ic_confirmation_number_48px.svg', 'ic_disc_full_48px.svg', 'ic_do_not_disturb_48px.svg', 'ic_do_not_disturb_alt_48px.svg', 'ic_drive_eta_48px.svg', 'ic_enhanced_encryption_48px.svg', 'ic_event_available_48px.svg', 'ic_event_busy_48px.svg', 'ic_event_note_48px.svg', 'ic_folder_special_48px.svg', 'ic_live_tv_48px.svg', 'ic_mms_48px.svg', 'ic_more_48px.svg', 'ic_network_check_48px.svg', 'ic_network_locked_48px.svg', 'ic_no_encryption_48px.svg', 'ic_ondemand_video_48px.svg', 'ic_personal_video_48px.svg', 'ic_phone_bluetooth_speaker_48px.svg', 'ic_phone_forwarded_48px.svg', 'ic_phone_in_talk_48px.svg', 'ic_phone_locked_48px.svg', 'ic_phone_missed_48px.svg', 'ic_phone_paused_48px.svg', 'ic_power_48px.svg', 'ic_rv_hookup_48px.svg', 'ic_sd_card_48px.svg', 'ic_sim_card_alert_48px.svg', 'ic_sms_48px.svg', 'ic_sms_failed_48px.svg', 'ic_sync_48px.svg', 'ic_sync_disabled_48px.svg', 'ic_sync_problem_48px.svg', 'ic_system_update_48px.svg', 'ic_tap_and_play_48px.svg', 'ic_time_to_leave_48px.svg', 'ic_vibration_48px.svg', 'ic_voice_chat_48px.svg', 'ic_vpn_lock_48px.svg', 'ic_wc_48px.svg', 'ic_wifi_48px.svg']
}, {
	category: 'places',
	fileNames: ['ic_ac_unit_48px.svg', 'ic_airport_shuttle_48px.svg', 'ic_all_inclusive_48px.svg', 'ic_beach_access_48px.svg', 'ic_business_center_48px.svg', 'ic_casino_48px.svg', 'ic_child_care_48px.svg', 'ic_child_friendly_48px.svg', 'ic_fitness_center_48px.svg', 'ic_free_breakfast_48px.svg', 'ic_golf_course_48px.svg', 'ic_hot_tub_48px.svg', 'ic_kitchen_48px.svg', 'ic_pool_48px.svg', 'ic_room_service_48px.svg', 'ic_smoke_free_48px.svg', 'ic_smoking_rooms_48px.svg', 'ic_spa_48px.svg']
}, {
	category: 'social',
	fileNames: ['ic_cake_48px.svg', 'ic_domain_48px.svg', 'ic_group_48px.svg', 'ic_group_add_48px.svg', 'ic_location_city_48px.svg', 'ic_mood_48px.svg', 'ic_mood_bad_48px.svg', 'ic_notifications_48px.svg', 'ic_notifications_active_48px.svg', 'ic_notifications_none_48px.svg', 'ic_notifications_off_48px.svg', 'ic_notifications_paused_48px.svg', 'ic_pages_48px.svg', 'ic_party_mode_48px.svg', 'ic_people_48px.svg', 'ic_people_outline_48px.svg', 'ic_person_48px.svg', 'ic_person_add_48px.svg', 'ic_person_outline_48px.svg', 'ic_plus_one_48px.svg', 'ic_poll_48px.svg', 'ic_public_48px.svg', 'ic_school_48px.svg', 'ic_share_48px.svg', 'ic_whatshot_48px.svg']
}, {
	category: 'toggle',
	fileNames: ['ic_check_box_48px.svg', 'ic_check_box_outline_blank_48px.svg', 'ic_radio_button_checked_48px.svg', 'ic_radio_button_unchecked_48px.svg', 'ic_star_half_48px.svg']
}];
});


//# sourceMappingURL=iconPicker.js.map