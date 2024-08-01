export const LOGIN = "login/";
export const ALL_DESIGNS = "list-all-design/";
export const UNVOTED_DESIGN = "design-list/?likes_count=0";
export const LIST_ALL_USER = "list/users/";
export const USER_CREATE = "user-create/";
export const USER_DELETE = "delete-users/";
export const EDIT_USER = "edit-users/";
export const LIST_UPLOAD_DESIGN = "upload-design/";

export const DESIGNPOOL_SEARCHBY_ID = "list-all-design/?design_code=";
export const ASSIGNMENT_SORTBY_DESIGNER = "assigned-design/?uploaduser=DESIGNER";
export const ASSIGNMENT_SORTBY_ADMIN = "assigned-design/?uploaduser=ADMIN";

export const MOVE_TO_ASSIGNMENT = "move-design/";
export const LIST_ASSIGNMENT_PANEL = "assigned-design/";
export const LIST_ASSIGNMENT_FOLDER = "getlist-folder/";
export const UPDATE_DESIGNPOOL_IMAGE= "update/design/";

// export const FOLDER_DETAIL_API = "folder-detail/";
export const FOLDER_DETAIL_API = "cad/list/folder-items/";
export const VOTERS_CUSTOMIZATION_LIST = "list-all-customization/";
export const MOVE_TO_FOLDER = "moveto-folder/";
export const VOTED_DESIGN_LIST = "design-list/?likes_count_min=1";
export const DELETE_CUSTOMIZATION = "delete-customizations/";
export const EDIT_CUTOMIZATION = "edit-customizations/";
export const LIST_ASSIGNED_CAD_DESIGN = "list/myassigned-data/";
export const CUSTOMIZATION_DETAILS = "customization-detail/";
export const DESIGN_LIST_CAD = "all-designlistof-cad/";
export const FINISHED_PROJECTS = "list/finished/projects/";
export const FOLDER_ITEM = "innerproject/detail/";
export const LIST_SLOT_HUB = "slot/list/";
export const LIST_FROM_DESIGN_CAD = "all-designlistof-cad/";
export const SLOT_VIEW_BY_ID = "slot/";
export const ASSIGNED_DATA_BY_ID = "list/myassigned-data/";
export const ASSIGN_TO_CAD = "assign-to-cad/";
export const LIST_ALL_CAD_DESIGNERS = "list-user-cad/";
export const LIST_ALL_CUSTOMIZATION_DESIGNS =
  "list-all-customization/?orderstatus=true";
export const SEND_MAIL = "send-email/";
export const LIST_WAREHOUSE_DESIGNS = "list-all-design/";
export const LIST_LAST_VOTED_DESIGN = "design-list/?likes_count_min=0";
export const CUSTOMIZATION_LIST_BY_ID_WAREHOUSE = "customizeddesign/detail/";
export const EDIT_CUTOMIZATIONS_WAREHOUSE = "edit-customizations";
export const REJECT_WAREHOUSE = "reject/customizations/";
export const CONFIRM_WAREHOUSE = "confirm/customizations/";
export const METAL_TYPE_DROPDOWN = "list/metaltype/";
export const PRODUCT_TYPE_DROPDOWN = "producttype-choices/";
export const CHOOSE_OUTLET_DROPDOWN = "outlet-choices/";
export const DIAMONDS_COLOR = "diamondColour-choices/";
export const DIAMOND_CLARITY = "diamondclarity-choices/";
export const CREATE_CUSTOMIZATION = "customizations/create/";
export const UPLOAD_CAD_DESIGN = "upload-cad-designs/";
export const USER_ACTIVATING = "users";
export const LIKE_DESIGN = "designs";
export const FORGOT_PASSWORD = "forgot-password/";
export const RESET_PASSWORD = "reset-password/";
export const TRANSFER_CAD = "update_cad_status";
export const STOCK_ORDER = "list/gallery/stock/";
export const CREATE_ORDER_GALLARY = "orders/create/";
export const FINISHED_PROJECT_CAD = "list-cad-designs/";
export const CREATE_FINISHED_PROJECTS = "create-finished-projects/";
export const CUSTOMIZED_ORDER = "list-all-customization/?orderstatus=true";
export const GET_LIST_FOLDER_BY_ID = "getlist-folder/?designer_id=";
export const METAL_TYPE = "list/metaltype/";
export const DIAMOND_TYPE_DROPDOWN = "list/diamondtype/";
export const TAG_LIST = "list/tag/";
export const FINDINGS_LIST = "list/findings/";
export const PRODUCT_CATEGORY_LIST = "master/category/list/";
export const ASSIGNMENT_MOVE = "move-design/";
export const CALCULATION = "master/calculate-mrp/";
export const CAD_DESIGNS = "single-user-designlistof-cad";
export const STATUS_CHANGE = "cad/complete-assignment/";
export const CAD_UPLOAD = "cad/upload-file/";
export const FINISHED_FOLDERS = "cad/finished-folder/";
export const FOLDER_DETAILS = "cad/list/folder-items/";
export const CAD_RE_UPLOAD = "cad/reupload/folder-items/";
export const BASIC_DETAILS = "items/";
export const ASSIGNMENT_PANEL_DETAILS_PAGE = "folder-detail/"

export const UPLOAD_ADMIN_IMAGE_ASSIGNMENT = "admin/upload/design/";
export const LIST_ALL_DESIGNERS = "list/paperdesigner/";
export const ASSIGN_UNASSIGN_DESIGNERS = "change-user/";
export const EDIT_BASIC_DETAILS = "folders/";
export const LIST_UNASSIGNED_DESIGNER = "list-all-design/?not_assigned=true";
export const LIST_CENTRAL_FOLDERS = "all/folderlist/";
export const CENTRAL_HUB_FOLDER_DETAILS = "cad/list/folder-items/";
export const CENTRAL_HUB_TRANSFER = "transfer/list/";
export const LIST_AVAILABLE_CAD_DESIGNS = "allocate/design/slot/list";
export const CREATE_SLOT_BAG = "allocate/design/slot/";
export const GENERATE_SLOT_NUMBER = "create-slot/";
export const SCAN_TRANSFER_SLOT = "transfer/scan-slot/";
export const LIST_CENTRAL_HUB_STATUS = "master/centralhub/status/list/";
export const CHANGE_CENTRAL_HUB_STATUS = "transfer/status/update/";
export const OUTLET_DROP_DOWN_MASTER = "list/outlets/";
export const SCAN_SLOT_LIST_GET = "slot/";
export const SCAN_TABLE_LIST = "warehouse/scan/list/";
export const SCAN_TABLE_SLOTID_SEARCH = "warehouse/scan/";
export const SCAN_TABLE_STATUS_GET = "master/warehouse/status/list/";
export const SCAN_TABLE_STATUS_CHANGE = "warehouse/status/update/";
export const WORKDONE_TABLE_LIST = "workdone/scan/list";
export const WORKDONE_TABLE_PRODUCT_SEARCH = "workdone/scan/";
export const WORKDONE_TABLE_PRODUCT_DETAIL = "workdone/";
export const WORKDONE_TABLE_PRODUCT_UPDATE = "assignment/";

export const WORKDONE_CUSTOMIZATION_APPROVE = "confirm/customizations/";

export const MASTERS_FINDING_DATAS = "master/finding/list";
export const MASTERS_FINDING_CREATE = "master/finding/create/";
export const FINDING_ITEM_DELETE = "master/finding/";
export const FINDING_ITEM_SEARCH_PRIORITY = "master/finding/list?page=";
export const FINDING_ITEM_UPDATE = "master/finding/";

export const MASTERS_TAG_DATAS = "master/tags/list";
export const TAG_ITEM_DELETE = "master/tags/";
export const TAG_ITEM_SEARCH = "master/tags/list?page=";
export const TAG_ITEM_CREATE = "master/tags/create/";
export const TAG_ITEM_UPDATE = "master/tags/";

export const MASTERS_METAL_DATAS = "master/metaltype/list";
export const METAL_ITEM_CREATE = "master/metaltype/create/";
export const METAL_ITEM_DELETE = "master/metaltype/";
export const METAL_ITEM_SEARCH = "master/metaltype/list?page=";
export const METAL_ITEM_UPDATE = "master/metaltype/";

export const MASTERS_DIAMOND_DATAS = "master/diamondtype/list";
export const DIAMOND_ITEM_CREATE = "master/diamondtype/create/";
export const DIAMOND_ITEM_DELETE = "master/diamondtype/";
export const DIAMOND_ITEM_SEARCH = "master/diamondtype/list?page=";
export const DIAMOND_ITEM_UPDATE = "master/diamondtype/";

export const MASTERS_VALUEADD_DATAS = "master/valueadd/list";
export const VALUEADD_ITEM_CREATE = "master/valueadd/create/";
export const VALUEADD_ITEM_DELETE = "master/valueadd/";
export const VALUEADD_ITEM_SEARCH = "master/valueadd/list?page=";
export const VALUEADD_ITEM_UPDATE = "master/valueadd/";

export const MASTERS_WHSTATUS_DATAS = "master/warehouse/status/list";
export const WHSTATUS_ITEM_CREATE = "master/warehouse/create/";
export const WHSTATUS_ITEM_DELETE = "master/warehouse/";
export const WHSTATUS_ITEM_SEARCH = "master/warehouse/status/list?page=";
export const WHSTATUS_ITEM_UPDATE = "master/warehouse/";

export const MASTERS_CENTRAL_DATAS = "master/centralhub/status/list";
export const CENTRAL_ITEM_CREATE = "master/centralhub/create/";
export const CENTRAL_ITEM_DELETE = "master/centralhub/";
export const CENTRAL_ITEM_SEARCH = "master/centralhub/status/list?page=";
export const CENTRAL_ITEM_UPDATE = "master/centralhub/";

export const MASTERS_CATEGORY_DATAS = "master/category/list";
export const CATEGORY_ITEM_CREATE = "master/category/create/";
export const CATEGORY_ITEM_DELETE = "master/category/";
export const CATEGORY_ITEM_SEARCH = "master/category/list?page=";
export const CATEGORY_ITEM_UPDATE = "master/category/";

export const MASTERS_OUTLET_DATAS = "master/outlet/list";
export const OUTLET_ITEM_CREATE = "master/outlet/create/";
export const OUTLET_ITEM_DELETE = "master/outlet/";
export const OUTLET_ITEM_SEARCH = "master/outlet/list?page=";
export const OUTLET_ITEM_UPDATE = "master/outlet/";

export const MOVE_SINGLE_ITEM_TO_DESIGNPOOL = "move-assignments/"
export const DELETE_ITEM_FROM_ASSIGNMENT_PANEL = "delete-assignment-item/"

export const NEW_SCAN_LIST = "warehouse/scan-productlsit";
export const NEW_SCAN_PRODUCTSCAN = "warehouse/scan-product";
export const NEW_SCAN_PRODUCTSTATUS_UPDATE = "warehouse/scan-update";
export const NEW_SCAN_PRODUCTSTATUS_DELETE = "warehouse/scan-delete/";

export const CENTRALHUB_NEW_SCAN_LIST = "centralhub/scan-list/";
export const CENTRALHUB_NEW_SCAN_PRODUCTSCAN = "centralhub/scan-product/";
export const CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_UPDATE = "centralhub/scan/update";
export const CENTRALHUB_NEW_SCAN_PRODUCTSTATUS_DELETE = "centralhub/scan-delete/";

export const LIST_ASSIGN_TO_LIST_ITEMS = "list/myassigned-data/"
export const SEARCH_WITH_NAMES = "list/users/?searchname="
export const EDIT_DETAIL_VIEW_WAREHOUSE= "warehouse/update-customization/"
export const USER_RESPONSE_UPDATING ="customization/"
export const SEARCH_DESIGNERS = "list/paperdesigner/?searchname="
export const SEARCH_CENTRAL_HUB_ITEMS = "allocate/design/slot/list?designcode="
export const UNASSIGN_CAD_DESIGNERS = "delete/assignedtocad/"
export const UNASSIGN_TO_CAD = "delete/assigntocad/"
export const UNVOTED_LIST_VOTERS = "myliked-list/?likes_count=0"
export const VOTED_LIST_LIKED = "myliked-list/?likes_min=0"
export const UNVOTED_VOTERS_LIST = "list-all-design/?likes_count=0"
export const LIST_FOLDER_DESIGNER = "designer/getlist-folder/"
export const LIST_FOLDER_DETAILS_DESIGNER = "designer/folder-detail/"
