import { ClaimKeys } from "@mb";
export const menuList = [
  {
    key: "main",
    hasSubMenus: true,
    intlMessagesId: "sidebar.main",
    iconClass: "icon icon-dasbhoard",
    claimKey: "AllowedItem",
    subMenus: [
      {
        key: "/home",
        linkTo: "/home",
        iconClass: "icon icon-home",
        intlMessagesId: "sidebar.homePage",
        claimKey: "AllowedItem",
      },
    ],
  },
  /*{
    key: "academics",
    hasSubMenus: true,
    intlMessagesId: "sidebar.academicsPage",
    iconClass: "icon icon-graduation",
    claimKey: "AllowedItem",
    subMenus: [
      {
        key: "/quiz",
        linkTo: "/quiz",
        iconClass: "icon icon-editor",
        intlMessagesId: "sidebar.quizPage",
        claimKey: ClaimKeys.CanListQuiz,
      },
      {
        key: "/plan",
        linkTo: "/plan",
        iconClass: "icon icon-listing-dbrd",
        intlMessagesId: "sidebar.planPage",
        claimKey: ClaimKeys.CanListPlans,
      },
    ],
  },
  {
    key: "ec",
    hasSubMenus: true,
    intlMessagesId: "sidebar.ecPage",
    iconClass: "icon icon-card",
    claimKey: "AllowedItem",
    subMenus: [
      {
        key: "/ec/library",
        linkTo: "/ec/library",
        iconClass: "icon icon-tab",
        intlMessagesId: "sidebar.eLibraryListPage",
        claimKey: ClaimKeys.CanListElectronicContent,
      },
    ],
  },
  {
    key: "hr",
    hasSubMenus: true,
    intlMessagesId: "sidebar.hrPage",
    iconClass: "icon icon-auth-screen",
    claimKey: "AllowedItem",
    subMenus: [
      {
        key: "/hr/employee",
        linkTo: "/hr/employee",
        iconClass: "icon icon-contacts",
        intlMessagesId: "sidebar.employeePage",
        claimKey: ClaimKeys.CanChangeEmployeement,
      },
    ],
  },
  {
    key: "kpi",
    hasSubMenus: true,
    intlMessagesId: "sidebar.kpiPage",
    iconClass: "icon icon-dasbhoard",
    claimKey: "NotAllowed",
    subMenus: [
      {
        key: "/kpi/dailyreport",
        linkTo: "/kpi/dailyreport",
        iconClass: "icon icon-data-entry",
        intlMessagesId: "sidebar.kpiDailyReportPage",
        claimKey: "NotAllowed",
      },
      {
        key: "/kpi/list",
        linkTo: "/kpi/list",
        iconClass: "icon icon-copy",
        intlMessagesId: "sidebar.kpiListPage",
        claimKey: "NotAllowed",
      },
    ],
  },*/
];
