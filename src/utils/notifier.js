//todo
import Noty from 'noty';
import 'noty/lib/noty.css';

/**
 * Show quick notification
 * @param type alert, error, success...
 * @param message
 */
export default function(type, message) {
  new Noty({
    type: type,
    text: message,
    layout: 'topRight',
    timeout: 1500
  }).show();
}