import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = 'TwilioCustomViewAgentPlugin';

export default class TwilioCustomViewAgentPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    const role = manager.workerClient.attributes.roles;

    console.log(`Role: ${JSON.stringify(role)}`);

    // flex.SideNav.Content.remove("agent-desktop", {
    //   if: (props) =>
    //     roleCustom === "Treinamento" || roleCustom === "Relatórios",
    // });
    
    flex.SideNav.Content.remove("teams", {
      if: (props) => role.includes("agent"),
    });
    flex.SideNav.Content.remove("questionnaires", {
      if: (props) => role.includes("agent"),
    });
    flex.SideNav.Content.remove("analyze", {
      if: (props) => role.includes("agent"),
    });
    flex.SideNav.Content.remove("dashboards", {
      if: (props) => role.includes("agent"),
    });
    flex.SideNav.Content.remove("queues-stats", {
      if: (props) => role.includes("agent"),
    });
    flex.SideNav.Content.remove("admin", {
      if: (props) => role.includes("agent"),
    });

    if(role.includes("agent"))
      Actions.invokeAction("NavigateToView", { viewName: "agent-desktop" });

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
