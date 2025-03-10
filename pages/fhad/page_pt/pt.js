import elementHelper from "../../../helpers/wdio_element";

/**
 * Base class containing common selectors
 */
class PtSelectors {
    get pt_club_select_dropdown() {
        return $('//*[@data-testid="ptschedule_filter_club-dropdown"]');
    }
    get pt_pt_name_select_dropdown() {
        return $('//*[@data-testid="ptschedule_filter_pt-dropdown"]');
    }
    //NOTE - Ini dipakai untuk pengecekan getText
    get pt_club_select_list() {
        return $('//*[@data-testid="ptschedule_club-dropdown-bottom-sheet"]');
    }
    //NOTE - Ini dipakai untuk pengecekan getText
    get pt_pt_name_select_list() {
        return $('//*[@data-testid="ptschedule_pt-dropdown-bottom-sheet"]');
    }
    pt_club_select_list_target(preferred_club) {
        return $(
            `//*[@data-testid="ptschedule_club-dropdown-bottom-sheet"]//*[contains(text(), '${preferred_club}')]`
        );
    }
    pt_pt_name_select_list_target(preferred_pt_name) {
        return $(
            `//*[@data-testid="ptschedule_pt-dropdown-bottom-sheet"]//*[contains(text(), '${preferred_pt_name}')]`
        );
    }
    get pt_buat_jadwal_button() {
        return $('//*[@data-testid="ptschedule_add-new-schedule-button"]');
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
}

/**
 * Class containing use case methods.
 * Use extends methods from action class and validation class only
 */
class Pt extends PtAction {}

export default new Pt();
