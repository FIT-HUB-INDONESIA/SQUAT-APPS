import elementHelper from "../../../helpers/wdio_element";

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
    }
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Pt extends PtAction {}

export default new Pt();
