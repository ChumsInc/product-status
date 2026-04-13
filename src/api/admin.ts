import {fetchJSON} from "@chumsinc/ui-utils";

export const PATH_CHECK_ADMIN_ROLE = '/api/user/v2/validate/role/product-admin.json';

export async function getAdminRole():Promise<boolean> {
    try {
        const res = await fetchJSON<{ success: boolean }>(PATH_CHECK_ADMIN_ROLE);
        return res?.success ?? false;
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("getAdminRole()", err.message);
            return Promise.reject(err);
        }
        console.debug("getAdminRole()", err);
        return Promise.reject(new Error('Error in getAdminRole()'));
    }
}
