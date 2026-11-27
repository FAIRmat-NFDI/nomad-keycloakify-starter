import "./main.css";
import { Suspense, lazy } from "react";
import type { ClassKey } from "keycloakify/login";
import type { KcContext } from "./KcContext";
import { useI18n } from "./i18n";
import DefaultPage from "keycloakify/login/DefaultPage";
import Template from "./Template";
import { getIsDark } from "../shared/isDark";

// Dark mode: ?dark=true|false (remembered for the session), else the OS preference.
// The colours live under `html.nomad-dark` in ./main.css.
document.documentElement.classList.toggle("nomad-dark", getIsDark());

const UserProfileFormFields = lazy(
    () => import("keycloakify/login/UserProfileFormFields")
);

const doMakeUserConfirmPassword = true;

export default function KcPage(props: { kcContext: KcContext }) {
    const { kcContext } = props;

    const { i18n } = useI18n({ kcContext });

    if (
        kcContext.pageId === "idp-review-user-profile.ftl" &&
        hasEditableUsername(kcContext) &&
        !hasProfileValidationErrors(kcContext)
    ) {
        const username = kcContext.profile.attributesByName.username;
        username.values = [];
        delete username.value;
    }

    return (
        <Suspense>
            <DefaultPage
                kcContext={kcContext}
                i18n={i18n}
                classes={classes}
                Template={Template}
                doUseDefaultCss={true}
                UserProfileFormFields={UserProfileFormFields}
                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
            />
        </Suspense>
    );
}

type IdpReviewContext = Extract<KcContext, { pageId: "idp-review-user-profile.ftl" }>;

function hasEditableUsername(kcContext: IdpReviewContext): boolean {
    const username = kcContext.profile.attributesByName.username;
    return username !== undefined && !username.readOnly;
}

function hasProfileValidationErrors(kcContext: IdpReviewContext): boolean {
    const { profile, messagesPerField, message } = kcContext;

    return (
        message?.type === "error" ||
        messagesPerField.existsError("global", ...Object.keys(profile.attributesByName))
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
