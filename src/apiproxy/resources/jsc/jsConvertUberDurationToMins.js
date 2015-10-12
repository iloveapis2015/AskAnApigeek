var uberDuration = context.getVariable("uberDuration");
uberDuration = Math.round(uberDuration/60);
context.setVariable("uberDuration",uberDuration);