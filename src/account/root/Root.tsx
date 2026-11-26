/**
 * This file has been claimed for ownership from @keycloakify/keycloak-account-ui version 260700.0.4.
 * To relinquish ownership and restore this file to its original content, run the following command:
 *
 * $ npx keycloakify own --path "account/root/Root.tsx" --revert
 */

/* eslint-disable */

// @ts-nocheck

import {
    ErrorPage,
    useAlerts,
    useEnvironment,
    KeycloakContext
} from "../../shared/keycloak-ui-shared";
import {
    AlertVariant,
    Page,
    Spinner,
    Tooltip
} from "../../shared/@patternfly/react-core";
import { Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    createBrowserRouter,
    Navigate,
    Outlet,
    RouteObject,
    RouterProvider
} from "react-router-dom";
import fetchContentJson from "../content/fetchContent";
import { type AccountEnvironment } from "..";
import { usePromise } from "../utils/usePromise";
import { Header } from "./Header";
import { MenuItem, PageNav } from "./PageNav";
import { routes } from "../routes";

function mapRoutes(
    context: KeycloakContext<AccountEnvironment>,
    content: MenuItem[]
): RouteObject[] {
    return content
        .map(item => {
            if ("children" in item) {
                return mapRoutes(context, item.children);
            }

            // Do not add route disabled via feature flags
            if (item.isVisible && !context.environment.features[item.isVisible]) {
                return null;
            }

            return {
                ...item,
                element:
                    "path" in item
                        ? routes.find(r => r.path === (item.id ?? item.path))?.element
                        : undefined
            };
        })
        .filter(item => !!item)
        .flat();
}

/** NOMAD page header: "User Settings" title with an info tooltip. */
function SettingsHeader() {
    const { t } = useTranslation();
    const description = t("userSettingsDescription");

    return (
        <div className="nomad-settings-header">
            <h1 className="nomad-settings-title">{t("userSettings")}</h1>
            <Tooltip content={description}>
                <span
                    className="nomad-settings-info"
                    tabIndex={0}
                    aria-label={description}
                    role="img"
                >
                    {/* Material "InfoOutlined" icon, as on nomad-lab.eu */}
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8" />
                    </svg>
                </span>
            </Tooltip>
        </div>
    );
}

function CatchAllRedirect() {
    const { t } = useTranslation();
    const { addAlert } = useAlerts();

    useEffect(() => {
        addAlert(t("pageNotFound"), AlertVariant.warning);
    }, [addAlert, t]);

    return <Navigate to="." replace />;
}

export const Root = () => {
    const context = useEnvironment<AccountEnvironment>();
    const [content, setContent] = useState<RouteObject[]>();

    usePromise(
        signal => fetchContentJson({ signal, context }),
        content => {
            setContent([
                {
                    path: decodeURIComponent(
                        new URL(context.environment.baseUrl).pathname
                    ),
                    element: (
                        <Page
                            header={
                                <>
                                    <Header />
                                    <SettingsHeader />
                                </>
                            }
                            sidebar={<PageNav />}
                            isManagedSidebar
                        >
                            <Suspense fallback={<Spinner />}>
                                <Outlet />
                            </Suspense>
                        </Page>
                    ),
                    errorElement: <ErrorPage />,
                    children: [
                        ...mapRoutes(context, content),
                        { path: "*", element: <CatchAllRedirect /> }
                    ]
                }
            ]);
        }
    );

    if (!content) {
        return <Spinner />;
    }
    return <RouterProvider router={createBrowserRouter(content)} />;
};
