/**
 * Project Name: Dmod ClickUp API
 * 
 * Author: dmod.gg | Dmod LLC
 * 
 * Creator: Toxic Dev (https://github.com/ThRealToxicDev
 * 
 * Maintainer: Toxic Dev
 * 
 * DISCLAIMER:
 * You are not authorized to upload, re-upload, distribute, license, sublicense, and or sell any copies of this code.
 * without direct permission from Toxic Dev & the dmod.gg Management Team. 
 * 
 *  Copyright © 2021 Dmod LLC
 */

const fetch = require ('node-fetch');

module.exports = {

    /**
     * FETCH ALL LISTS
     * @param {string} folder_id
     */

     async getAllLists(folder_id) {

        return await fetch(
            `https://api.clickup.com/api/v2/folder/${folder_id}/list`, 
            {
                method: "GET",
                headers: {
                    authorization: client.clickup.TOKEN,
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            const json = await res.json();
            return json.lists;
        });
     },

          /**
      * FETCH A LIST VIA ITS ID
      * @param {string} list_id
      */

     async getListID(list_id) {

        return await fetch(
            `https://api.clickup.com/api/v2/list/${list_id}`, 
            {
                method: "GET",
                headers: {
                    authorization: client.clickup.TOKEN,
                    "Content-Type": "application/json",
                },
            }
        ).then((res) => res.json());
      },

      /**
       * FETCH ALL FOLDERS
       */

       async getAllFolders() {

        return await fetch(
            `https://api.clickup.com/api/v2/spaces/${client.clickup.SPACE_ID}/folder?archived=false`,
            {
                method: "GET",
                headers: {
                    authorization: client.clickup.TOKEN,
                    "Content-Type": "application/json",
                },
            }
        ).then(async (res) => {
            const json = await res.json();
            return json.folders;
        });
       },

        /**
   * Gets a folder by id
   * @param {string} id
   */
  async getFolder(folder_id) {
    return await fetch(`https://api.clickup.com/api/v2/folder/${folder_id}`, {
      method: "GET",
      headers: {
        Authorization: client.clickup.TOKEN,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
  /**
   * Fetchs all tasks from a list
   * @param {Number} list_id id of list
   * @param {boolean} archived default false
   * @param {Number} page page to fetch - default 0
   * @param {string} order_by orders by field - default created, options: id, created, updated, due_date
   * @param {boolean} reverse default false
   * @param {boolean} subtasks default false
   */
  async getTasks(
    list_id,
    archived = false,
    page = 0,
    order_by = "created",
    reverse = false,
    subtasks = false
  ) {
    return await fetch(
      `https://api.clickup.com/api/v2/list/${list_id}/task?archived=${archived}&page=${page}&order_by=${order_by}&reverse=${reverse}&subtasks=${subtasks}`,
      {
        method: "GET",
        headers: {
          Authorization: client.clickup.TOKEN,
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      const json = await res.json();
      return json.tasks;
    });
  },

  /**
   * gets a task by id
   * @param {string} task_id
   */
  async getTask(task_id) {
    return await fetch(`https://api.clickup.com/api/v2/task/${task_id}`, {
      method: "GET",
      headers: {
        Authorization: client.clickup.TOKEN,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },

  async createTask(list_id, name, content) {
    const body = JSON.stringify({
      name,
      text_content: content,
      notify_all: true,
    });

    return await fetch(`https://api.clickup.com/api/v2/list/${list_id}/task`, {
      method: "POST",
      headers: {
        Authorization: client.clickup.TOKEN,
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => res.json());
  },

  async deleteTask(task_id) {
    return await fetch(`https://api.clickup.com/api/v2/task/${task_id}`, {
      method: "DELETE",
      headers: {
        Authorization: client.clickup.TOKEN,
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  },
};