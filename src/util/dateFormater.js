export function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];

  export function formatDate(date, monthName) {
    const dateNow = new Date();

    if(dateNow.getDate() === date.getDate()){
      return 'Today';
    }else if(dateNow.getDate() - date.getDate() === 1){
      return 'Yeasterday';
    }
    
    const dateNum = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear() - 2000;

    if(monthName){
      return `${monthNames[month]} ${dateNum}, ${year}`;
    }

    return `${dateNum}/${month + 1}/${year}`;
  }