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

    const defaultPage = (
                            <DefaultPage
                                kcContext={kcContext}
                                i18n={i18n}
                                classes={classes}
                                Template={Template}
                                doUseDefaultCss={true}
                                UserProfileFormFields={UserProfileFormFields}
                                doMakeUserConfirmPassword={doMakeUserConfirmPassword}
                            />
                        );

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "idp-review-user-profile.ftl": {
                        const { profile, messagesPerField, message } = kcContext;

                        const hasValidationErrors =
                            message?.type === "error" ||
                            messagesPerField.existsError(
                                "global",
                                ...Object.keys(profile.attributesByName)
                            );

                        const username = kcContext.profile.attributesByName.username;

                        if (username !== undefined && !hasValidationErrors) {
                            username.values = [];
                            delete username.value;
                        }

                        return defaultPage;
                    }
                    default:
                        return defaultPage;
                }
            })()}
        </Suspense>
    );
}

const classes = {} satisfies { [key in ClassKey]?: string };
