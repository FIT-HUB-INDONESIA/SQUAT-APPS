import elementHelper from "../../../helpers/wdio_element";
import mobileHelper from "../../../helpers/wdio_mobile";

/**
 * Base class containing common selectors
 */
class PtSelectors {
    get pt_club_select_dropdown() {
        return $('//*[@data-testid="ptschedule_filter_club-dropdown"]');
    }
    //NOTE - getText testing purposes
    get pt_club_select_list() {
        return $('//*[@data-testid="ptschedule_club-dropdown-bottom-sheet"]');
    }
    pt_club_select_list_target(preferred_club) {
        return $(
            `//*[@data-testid="ptschedule_club-dropdown-bottom-sheet"]//*[contains(text(), '${preferred_club}')]`
        );
    }
    get pt_pt_name_select_dropdown() {
        return $('//*[@data-testid="ptschedule_filter_pt-dropdown"]');
    }
    //NOTE - getText testing purposes
    get pt_pt_name_select_list() {
        return $('//*[@data-testid="ptschedule_pt-dropdown-bottom-sheet"]');
    }
    pt_pt_name_select_list_target(preferred_pt_name) {
        return $(
            `//*[@data-testid="ptschedule_pt-dropdown-bottom-sheet"]//*[contains(text(), '${preferred_pt_name}')]`
        );
    }
    get pt_buat_jadwal_button() {
        return $('//*[@data-testid="ptschedule_add-new-schedule-button"]');
    }
    get pt_activity_type_dropdown() {
        return $('(//*[@aria-label="button select"])[3]');
    }
    //NOTE - getText testing purposes
    get pt_activity_type_list() {
        return $('(//*[@class="bottom-sheet__content"])[2]');
    }
    pt_activity_type_list_target(preferred_activity_type) {
        return $(
            `(//*[@class="bottom-sheet__content"])[2]//*[contains(text(), '${preferred_activity_type}')]`
        );
    }
    get pt_date_picker_button() {
        return $('(//*[@aria-label="button datepicker"])[2]');
    }
    //NOTE - getText testing purposes
    get pt_date_picker_list() {
        return $('//*[@aria-label="calendar picker"]/div[2]');
    }
    pt_date_picker_list_target(preferred_date) {
        return $(
            `//*[@aria-label="calendar picker"]//*[@style="color: rgb(16, 24, 32); margin: 0px; text-align: center;" and text()='${preferred_date}']`
        );
    }
    get pt_started_at_button() {
        return $('(//*[@aria-label="button timepicker"])[1]');
    }
    get pt_finished_at_button() {
        return $('(//*[@aria-label="button timepicker"])[2]');
    }
    get pt_time_picker_select_button() {
        return $('//*[@data-testid="time-picker_submit-button"]');
    }
    get pt_client_dropdown() {
        return $('(//*[@aria-label="button select"])[4]');
    }
    get pt_client_search_field() {
        return $('//*[@aria-label="input field"]');
    }
    get pt_client_list() {
        return $('//*[@class="ptschedule-client-detail"]');
    }
    get pt_notes_field() {
        return $(`//textarea[@rows="4"]`);
    }
    get pt_save_button() {
        return $('//*[@aria-label="button save"]');
    }
    get pt_confirmation_button() {
        return $('//*[@aria-label="submit button"]');
    }
}

/**
 * Class containing validation methods
 */
class PtValidation extends PtSelectors {}

/**
 * Class containing action methods
 */
class PtAction extends PtValidation {
    async click_pt_club_select_dropdown() {
        await elementHelper.click(
            this.pt_club_select_dropdown,
            `pt_club_select_dropdown`,
            `Successfully show club list bottomsheet`
        );
    }
    async click_pt_club_select_list_target(preferred_club) {
        await elementHelper.click(
            this.pt_club_select_list_target(preferred_club),
            `pt_club_select_list_target`,
            `Successfully select preferred club: ${preferred_club}`
        );
    }
    async click_pt_pt_name_select_dropdown() {
        await elementHelper.click(
            this.pt_pt_name_select_dropdown,
            `pt_pt_name_select_dropdown`,
            `Successfully show pt name list bottomsheet`
        );
    }
    async click_pt_pt_name_select_list_target(preferred_pt_name) {
        await elementHelper.click(
            this.pt_pt_name_select_list_target(preferred_pt_name),
            `pt_pt_name_select_list_target`,
            `Successfully select preferred pt name: ${preferred_pt_name}`
        );
    }
    async click_pt_buat_jadwal_button() {
        await elementHelper.click(
            this.pt_buat_jadwal_button,
            `pt_buat_jadwal_button`,
            `Successfully show buat jadwal form bottomsheet`
        );
    }
    async click_pt_activity_type_dropdown() {
        await elementHelper.click(
            this.pt_activity_type_dropdown,
            `pt_activity_type_dropdown`,
            `Successfully show tipe aktivitas list bottomsheet`
        );
    }
    async click_pt_activity_type_list_target(preferred_activity_type) {
        await elementHelper.click(
            this.pt_activity_type_list_target(preferred_activity_type),
            `pt_activity_type_list_target`,
            `Successfully select preferred activity type: ${preferred_activity_type}`
        );
    }
    async click_pt_date_picker_button() {
        await elementHelper.click(
            this.pt_date_picker_button,
            `pt_date_picker_button`,
            `Successfully show date picker bottomsheet`
        );
    }
    async click_pt_date_picker_list_target(preferred_date) {
        await elementHelper.click(
            this.pt_date_picker_list_target(preferred_date),
            `pt_date_picker_list_target`,
            `Successfully select preferred date: ${preferred_date}`
        );
    }
    async click_pt_started_at_button() {
        await elementHelper.click(
            this.pt_started_at_button,
            `pt_started_at_button`,
            `Successfully show time picker bottomsheet`
        );
        await browser.pause(1000);
    }
    async click_pt_finished_at_button() {
        await elementHelper.click(
            this.pt_finished_at_button,
            `pt_finished_at_button`,
            `Successfully show time picker bottomsheet`
        );
        await browser.pause(1000);
    }
    async click_pt_time_picker_select_button() {
        await elementHelper.click(
            this.pt_time_picker_select_button,
            `pt_time_picker_select_button`,
            `Successfully select preferred schedule time`
        );
    }
    async click_pt_client_dropdown() {
        await elementHelper.click(
            this.pt_client_dropdown,
            `pt_client_dropdown`,
            `Successfully show client list bottomsheet`
        );
    }
    async addValue_pt_client_search_field(input_value) {
        await elementHelper.addValue(
            this.pt_client_search_field,
            `pt_client_search_field`,
            input_value,
            `Successfully search preferred client`
        );
        await browser.pause(1000);
    }
    async click_pt_client_list() {
        await elementHelper.click(
            this.pt_client_list,
            `pt_client_list`,
            `Successfully select preferred client`
        );
        await browser.pause(2000);
    }
    async addValue_pt_notes_field() {
        await elementHelper.addValue(
            this.pt_notes_field,
            `pt_notes_field`,
            `QA UI Real device automation test: ${browser.capabilities.platformName}`,
            `Successfully fill notes field`
        );
    }
    async click_pt_save_button() {
        await elementHelper.click(
            this.pt_save_button,
            `pt_save_button`,
            `Successfully show save confirmation bottomsheet`
        );
    }
    async click_pt_confirmation_button() {
        await elementHelper.click(
            this.pt_confirmation_button,
            `pt_confirmation_button`,
            `Successfully submit and save pt schedule activity form`
        );
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Pt extends PtAction {
    async select_time_picker_add_one_hour() {
        await mobileHelper.dragSilent({
            ios: {
                startX: 125,
                startY: 479,
                endX: 125,
                endY: 454
            },
            android: {
                startX: 343,
                startY: 1540,
                endX: 343,
                endY: 1470
            }
        });
    }
    async select_time_picker_minus_one_hour() {
        await mobileHelper.dragSilent({
            ios: {
                startX: 125,
                startY: 479,
                endX: 125,
                endY: 499
            },
            android: {
                startX: 343,
                startY: 1540,
                endX: 343,
                endY: 1625
            }
        });
    }
    async select_time_picker_hour(preferred_hour) {
        const currentHour = new Date().getHours();

        let loop = 0;

        if (currentHour >= 6 && currentHour <= 22) {
            loop = Math.abs(currentHour - preferred_hour);
        } else if (currentHour > 22 || currentHour < 6) {
            if (currentHour > 22 && preferred_hour !== 6) {
                loop = Math.abs(6 - preferred_hour);
            } else if (currentHour < 6) {
                loop = Math.abs(6 - preferred_hour);
            }
        }

        if (
            (currentHour >= 6 && preferred_hour < currentHour) ||
            (currentHour > 22 && preferred_hour < 6) ||
            (currentHour < 6 && preferred_hour < 6)
        ) {
            for (let i = 0; i < loop; i++) {
                await this.select_time_picker_minus_one_hour();
                await browser.pause(500);
            }
        } else if (
            (currentHour >= 6 && preferred_hour > currentHour) ||
            (currentHour < 6 && preferred_hour >= 6) ||
            (currentHour > 22 && preferred_hour !== 6)
        ) {
            for (let i = 0; i < loop; i++) {
                await this.select_time_picker_add_one_hour();
                await browser.pause(500);
            }
        }

        await browser.pause(2000);
    }
    async select_time_picker_hour_finish(
        preferred_finish_hour,
        preferred_start_hour
    ) {
        const finishHour = preferred_finish_hour - preferred_start_hour;

        if (finishHour > 0) {
            for (let i = 0; i < finishHour; i++) {
                await this.select_time_picker_add_one_hour();
                await browser.pause(500);
            }
        } else {
            return;
        }
    }
    async select_time_picker_add_fifteen_minutes() {
        await mobileHelper.dragSilent({
            ios: {
                startX: 242,
                startY: 479,
                endX: 242,
                endY: 454
            },
            android: {
                startX: 737,
                startY: 1540,
                endX: 737,
                endY: 1455
            }
        });
    }
    async select_time_picker_minutes(preferred_minutes) {
        const first_quarter = "15";
        const second_quarter = "30";
        const third_quarter = "45";
        const fourth_quarter = "00";

        if (preferred_minutes === first_quarter) {
            for (let i = 0; i < 1; i++) {
                await this.select_time_picker_add_fifteen_minutes();
                await browser.pause(500);
            }
        } else if (preferred_minutes === second_quarter) {
            for (let i = 0; i < 2; i++) {
                await this.select_time_picker_add_fifteen_minutes();
                await browser.pause(500);
            }
        } else if (preferred_minutes === third_quarter) {
            for (let i = 0; i < 3; i++) {
                await this.select_time_picker_add_fifteen_minutes();
                await browser.pause(500);
            }
        } else if (preferred_minutes === fourth_quarter) {
            return;
        }
    }
}

export default new Pt();
