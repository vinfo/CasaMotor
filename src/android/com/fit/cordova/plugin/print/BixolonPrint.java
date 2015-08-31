package com.fit.cordova.plugin.print;

import java.util.Set;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.LOG;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;

import android.bluetooth.BluetoothDevice;
import android.content.Context;
import android.os.Bundle;
import android.os.Handler;
import android.os.Message;

import com.bixolon.printer.BixolonPrinter;

public class BixolonPrint extends CordovaPlugin {

	private CallbackContext callbackContext;
	static BixolonPrinter mBixolonPrinter;
	//static Context appContext; 
	
	/**
	 * Executes the request.
	 * 
	 * This method is called from the WebView thread. To do a non-trivial amount
	 * of work, use: cordova.getThreadPool().execute(runnable);
	 * 
	 * To run on the UI thread, use:
	 * cordova.getActivity().runOnUiThread(runnable);
	 * 
	 * @param action
	 *            The action to execute.
	 * @param args
	 *            The exec() arguments.
	 * @param callbackContext
	 *            The callback context used when calling back into JavaScript.
	 * @return Whether the action was valid.
	 * 
	 * @sa 
	 *     https://github.com/apache/cordova-android/blob/master/framework/src/org
	 *     /apache/cordova/CordovaPlugin.java
	 */
	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) {
		this.callbackContext = callbackContext;
		//BixolonPrint.appContext = this.cordova.getActivity().getApplicationContext();
		
		LOG.i("am", "Bixolon Printer bluetooth");
		mBixolonPrinter = new BixolonPrinter(this.cordova.getActivity().getApplicationContext(), mHandler, null);
		LOG.i("am", "find Bixolon");
		mBixolonPrinter.findBluetoothPrinters();
		
		//mBixolonPrinter.for
		return true;
	}
	
	private final Handler mHandler = new Handler(new Handler.Callback() {
		
		@SuppressWarnings("unchecked")
		@Override
		public boolean handleMessage(Message msg) {
			//Log.d(TAG, "mHandler.handleMessage(" + msg + ")");
			
			switch (msg.what) {
			case BixolonPrinter.MESSAGE_STATE_CHANGE:
				switch (msg.arg1) {
				case BixolonPrinter.STATE_CONNECTED:
					//mIsConnected = true;
					LOG.i("am", "Connected to bluetooth");
					mBixolonPrinter.formFeed(true);
					mBixolonPrinter.printText("AM Test\n", 
							BixolonPrinter.ALIGNMENT_CENTER, 
							BixolonPrinter.TEXT_ATTRIBUTE_FONT_A, 
							BixolonPrinter.TEXT_SIZE_HORIZONTAL1 | BixolonPrinter.TEXT_SIZE_VERTICAL1, 
							true);
					break;

				case BixolonPrinter.STATE_CONNECTING:
					LOG.i("am", "Connecting to bluetooth");
					break;

				case BixolonPrinter.STATE_NONE:
					LOG.i("am", "Disconnected to bluetooth");
					//mIsConnected = false;
					break;
				}
				return true;
				
			case BixolonPrinter.MESSAGE_WRITE:
				switch (msg.arg1) {
				case BixolonPrinter.PROCESS_SET_SINGLE_BYTE_FONT:
					//Bundle data = msg.getData();
					//Toast.makeText(getApplicationContext(), data.getString(BixolonPrinter.KEY_STRING_CODE_PAGE), Toast.LENGTH_SHORT).show();
					break;
					
				case BixolonPrinter.PROCESS_SET_DOUBLE_BYTE_FONT:
					//mHandler.obtainMessage(MESSAGE_END_WORK).sendToTarget();
					
					//Toast.makeText(getApplicationContext(), "Complete to set double byte font.", Toast.LENGTH_SHORT).show();
					break;
					
				case BixolonPrinter.PROCESS_DEFINE_NV_IMAGE:
					mBixolonPrinter.getDefinedNvImageKeyCodes();
					//Toast.makeText(getApplicationContext(), "Complete to define NV image", Toast.LENGTH_LONG).show();
					break;
					
				case BixolonPrinter.PROCESS_REMOVE_NV_IMAGE:
					mBixolonPrinter.getDefinedNvImageKeyCodes();
					//Toast.makeText(getApplicationContext(), "Complete to remove NV image", Toast.LENGTH_LONG).show();
					break;
					
				case BixolonPrinter.PROCESS_UPDATE_FIRMWARE:
					mBixolonPrinter.disconnect();
					//Toast.makeText(getApplicationContext(), "Complete to download firmware.\nPlease reboot the printer.", Toast.LENGTH_SHORT).show();
					break;
				}
				return true;

			case BixolonPrinter.MESSAGE_READ:
				//MainActivity.this.dispatchMessage(msg);
				return true;

			case BixolonPrinter.MESSAGE_DEVICE_NAME:
				//mConnectedDeviceName = msg.getData().getString(BixolonPrinter.KEY_STRING_DEVICE_NAME);
				//Toast.makeText(getApplicationContext(), mConnectedDeviceName, Toast.LENGTH_LONG).show();
				return true;

			case BixolonPrinter.MESSAGE_TOAST:
				//mListView.setEnabled(false);
				//Toast.makeText(getApplicationContext(), msg.getData().getString(BixolonPrinter.KEY_STRING_TOAST), Toast.LENGTH_SHORT).show();
				return true;
				
			case BixolonPrinter.MESSAGE_BLUETOOTH_DEVICE_SET:
				/*if (msg.obj == null) {
					Toast.makeText(BixolonPrint.appContext, "No paired device", Toast.LENGTH_SHORT).show();
				} else {
					DialogManager.showBluetoothDialog(this.cordova.getActivity(), (Set<BluetoothDevice>) msg.obj);
				}*/
				LOG.i("am", ((Set<BluetoothDevice>) msg.obj).toString());
				Set<BluetoothDevice> bluetoothDevicesSet = (Set<BluetoothDevice>) msg.obj;
				for (BluetoothDevice device : bluetoothDevicesSet) {
					LOG.i("am", device.getName());
					//if(device.getName().equals("SPP-R300")) {
					//	mBixolonPrinter.connect(device.getAddress());
					//	
					//	break;
					//}
				}
				mBixolonPrinter.connect((String) null);
				return true;
				
			case BixolonPrinter.MESSAGE_PRINT_COMPLETE:
				//Toast.makeText(getApplicationContext(), "Complete to print", Toast.LENGTH_SHORT).show();
				mBixolonPrinter.disconnect();
				return true;
				
			case BixolonPrinter.MESSAGE_ERROR_INVALID_ARGUMENT:
				//Toast.makeText(getApplicationContext(), "Invalid argument", Toast.LENGTH_SHORT).show();
				return true;
				
			case BixolonPrinter.MESSAGE_ERROR_NV_MEMORY_CAPACITY:
				//Toast.makeText(getApplicationContext(), "NV memory capacity error", Toast.LENGTH_SHORT).show();
				return true;
				
			case BixolonPrinter.MESSAGE_ERROR_OUT_OF_MEMORY:
				//Toast.makeText(getApplicationContext(), "Out of memory", Toast.LENGTH_SHORT).show();
				return true;
				
			case BixolonPrinter.MESSAGE_COMPLETE_PROCESS_BITMAP:
				String text = "Complete to process bitmap.";
				Bundle data = msg.getData();
				byte[] value = data.getByteArray(BixolonPrinter.KEY_STRING_MONO_PIXELS);
				/*
				if (value != null) {
					Intent intent = new Intent();
					intent.setAction(ACTION_COMPLETE_PROCESS_BITMAP);
					intent.putExtra(EXTRA_NAME_BITMAP_WIDTH, msg.arg1);
					intent.putExtra(EXTRA_NAME_BITMAP_HEIGHT, msg.arg2);
					intent.putExtra(EXTRA_NAME_BITMAP_PIXELS, value);
					sendBroadcast(intent);
				}
				
				Toast.makeText(getApplicationContext(), text, Toast.LENGTH_SHORT).show();
				*/
				return true;
				
			//case MESSAGE_START_WORK:
				//mListView.setEnabled(false);
				//mProgressBar.setVisibility(View.VISIBLE);
				//return true;
				
			//case MESSAGE_END_WORK:
				//mListView.setEnabled(true);
				//mProgressBar.setVisibility(View.INVISIBLE);
				//return true;
				
			case BixolonPrinter.MESSAGE_USB_DEVICE_SET:
				/*if (msg.obj == null) {
					Toast.makeText(getApplicationContext(), "No connected device", Toast.LENGTH_SHORT).show();
				} else {
					DialogManager.showUsbDialog(MainActivity.this, (Set<UsbDevice>) msg.obj, mUsbReceiver);
				}
				*/
				return true;
				
			case BixolonPrinter.MESSAGE_NETWORK_DEVICE_SET:
				/*if (msg.obj == null) {
					Toast.makeText(getApplicationContext(), "No connectable device", Toast.LENGTH_SHORT).show();
				}
				DialogManager.showNetworkDialog(MainActivity.this, (Set<String>) msg.obj);
				*/
				return true;
			}
			return false;
		}
	});
}
