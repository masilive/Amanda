using Amanda.Controllers;
using Amanda.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using System.Threading.Tasks;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Notifications;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

// The Blank Page item template is documented at https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x409

namespace Amanda
{
    /// <summary>
    /// An empty page that can be used on its own or navigated to within a Frame.
    /// </summary>
    public sealed partial class MainPage : Page
    {
		public delegate void ShowNotificationHandler(string message, NotificationTypeEnum notificationType);
		public static event ShowNotificationHandler ShowNotification;

        public MainPage()
        {
            this.InitializeComponent();
        }

		private void Page_Loaded(object sender, RoutedEventArgs e)
		{
			ShowNotification += MainPageShowNotification;
		}

		private void MainPageShowNotification(string message, NotificationTypeEnum notificationType)
		{
			_ = AddNotification(message, notificationType);
		}

		private async Task AddNotification(string message, NotificationTypeEnum notificationType)
		{
			_ = await WebViewMain.InvokeScriptAsync("showNotification", new string[] { message, notificationType.ToString() });
		}

		private void WebViewMain_ScriptNotify(object sender, NotifyEventArgs e)
		{
			string[] valueArray = e.Value.Split(':');

			switch (valueArray[0])
			{
				case "1":
					ShowNotification.Invoke(valueArray[1], (NotificationTypeEnum)int.Parse(valueArray[2]));
					break;
				default:
					break;
			}
		}

		private void WebViewMain_Loaded(object sender, RoutedEventArgs e)
		{

		}
	}
}
